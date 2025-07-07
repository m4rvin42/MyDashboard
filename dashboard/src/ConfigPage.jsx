import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loadLayout, saveLayout } from './layout.js'
import { VerticalStackPanel, HorizontalStackPanel } from './StackPanels.jsx'
import DateTimeWidget from './DateTimeWidget.jsx'
import StringWidget from './StringWidget.jsx'
import TestWidget from './TestWidget.jsx'
import BackendTestWidget from './BackendTestWidget.jsx'

const widgets = { DateTimeWidget, StringWidget, TestWidget, BackendTestWidget }

const palette = [
  { label: 'Vertical Stack', data: { type: 'vertical', children: [] } },
  { label: 'Horizontal Stack', data: { type: 'horizontal', children: [] } },
  { label: 'DateTimeWidget', data: { type: 'widget', widget: 'DateTimeWidget' } },
  { label: 'StringWidget', data: { type: 'widget', widget: 'StringWidget', props: { text: '' } } },
  { label: 'TestWidget', data: { type: 'widget', widget: 'TestWidget' } },
  { label: 'BackendTestWidget', data: { type: 'widget', widget: 'BackendTestWidget' } },
]

function getNode(layout, path) {
  let node = layout
  for (const idx of path) {
    if (!node.children) return null
    node = node.children[idx]
  }
  return node
}

function updateAtPath(layout, path, updater) {
  if (path.length === 0) return updater(layout)
  const [idx, ...rest] = path
  return {
    ...layout,
    children: layout.children.map((c, i) =>
      i === idx ? updateAtPath(c, rest, updater) : c
    ),
  }
}

function removeAtPath(layout, path) {
  if (path.length === 0) return layout
  const [idx, ...rest] = path
  if (rest.length === 0) {
    return {
      ...layout,
      children: layout.children.map((c, i) => (i === idx ? null : c)),
    }
  }
  return {
    ...layout,
    children: layout.children.map((c, i) =>
      i === idx ? removeAtPath(c, rest) : c
    ),
  }
}

export default function ConfigPage() {
  const navigate = useNavigate()
  const [layout, setLayout] = useState(loadLayout())

  const allowDrop = (e) => e.preventDefault()

  function handleDragStart(e, item) {
    e.dataTransfer.setData('application/json', JSON.stringify(item))
  }

  function handleDrop(e, path, index) {
    e.preventDefault()
    e.stopPropagation()
    const item = JSON.parse(e.dataTransfer.getData('application/json'))
    setLayout((old) => {
      const panelPath = path
      const panel = getNode(old, panelPath)
      const children = panel.children ? [...panel.children] : []
      const insertIndex = typeof index === 'number' ? index : children.length
      children[insertIndex] = item
      const newLayout = updateAtPath(old, panelPath, (n) => ({ ...n, children }))
      return newLayout
    })
    const newIndex = typeof index === 'number' ? index : getNode(layout, path).children.length
    const newPath = [...path, newIndex]
    if (item.type === 'widget') {
      setTimeout(() => openSettings(newPath), 10)
    }
  }

  function DropZone({ onDrop, children, style }) {
    const [over, setOver] = useState(false)
    const base = {
      border: '3px dashed #888',
      padding: 8,
      transition: 'border-color 0.2s, background-color 0.2s, transform 0.2s',
      ...style,
    }
    const active = over
      ? { borderColor: '#4f8ef7', backgroundColor: 'rgba(79,142,247,0.1)', transform: 'scale(1.02)' }
      : {}
    return (
      <div
        style={{ ...base, ...active }}
        onDragEnter={(e) => { e.preventDefault(); setOver(true) }}
        onDragLeave={() => setOver(false)}
        onDragOver={allowDrop}
        onDrop={(e) => { setOver(false); onDrop(e) }}
      >
        {children}
      </div>
    )
  }

  function openSettings(path) {
    setLayout((old) =>
      updateAtPath(old, path, (node) => {
        if (node.type === 'widget') {
          if (node.widget === 'StringWidget') {
            const text = prompt('Enter text', node.props?.text || '')
            if (text === null) return node
            const fontSize = prompt(
              'Font size',
              node.props?.fontSize || '1rem',
            )
            if (fontSize === null) return node
            const textColor = prompt(
              'Text color',
              node.props?.textColor || 'blue',
            )
            if (textColor === null) return node
            const backgroundColor = prompt(
              'Background color',
              node.props?.backgroundColor || 'yellow',
            )
            if (backgroundColor === null) return node
            return {
              ...node,
              props: { text, fontSize, textColor, backgroundColor },
            }
          }
          if (node.widget === 'DateTimeWidget') {
            const fontSize = prompt(
              'Font size',
              node.props?.fontSize || '1rem',
            )
            if (fontSize === null) return node
            const textColor = prompt(
              'Text color',
              node.props?.textColor || 'green',
            )
            if (textColor === null) return node
            const backgroundColor = prompt(
              'Background color',
              node.props?.backgroundColor || 'red',
            )
            if (backgroundColor === null) return node
            return {
              ...node,
              props: { fontSize, textColor, backgroundColor },
            }
          }
          return node
        }
        const cells = prompt(
          'Number of cells',
          node.children ? node.children.length : 1,
        )
        const n = parseInt(cells, 10)
        if (!Number.isNaN(n) && n > 0) {
          const children = node.children ? node.children.slice(0, n) : []
          while (children.length < n) children.push(null)
          return { ...node, children }
        }
        return node
      }),
    )
  }

  const renderNode = (node, path = []) => {
    if (!node) {
      const parent = path.slice(0, -1)
      const idx = path[path.length - 1]
      return (
        <DropZone
          key={path.join('-')}
          onDrop={(e) => handleDrop(e, parent, idx)}
          style={{ flex: 1, margin: 2, minHeight: 30 }}
        />
      )
    }

    if (node.type === 'vertical' || node.type === 'horizontal') {
      const Panel = node.type === 'vertical' ? VerticalStackPanel : HorizontalStackPanel
      return (
        <div
          key={path.join('-')}
          style={{
            border: '1px dashed #666',
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            position: 'relative',
          }}
        >
          <div
            style={{ display: 'flex', gap: '4px', padding: '6px', border: '2px solid #666' }}
          >
            <button
              onClick={(e) => {
                e.preventDefault()
                openSettings(path)
              }}
              aria-label="Configure panel"
              title="Configure panel"
            >
              ⚙
            </button>
            <button
              onClick={(e) => {
                e.preventDefault()
                setLayout((old) => removeAtPath(old, path))
              }}
              aria-label="Remove panel"
              title="Remove panel"
            >
              🗑
            </button>
          </div>
          <Panel
            style={{ flex: 1, position: 'relative' }}
            onDragOver={allowDrop}
            onDrop={(e) => handleDrop(e, path)}
          >
            {node.children && node.children.map((child, i) => (
              <DropZone
                key={i}
                onDrop={(e) => handleDrop(e, path, i)}
                style={{ flex: 1, position: 'relative', border: 'none', padding: 0 }}
              >
                {renderNode(child, [...path, i])}
              </DropZone>
            ))}
          </Panel>
        </div>
      )
    }

    if (node.type === 'widget') {
      const Widget = widgets[node.widget]
      return (
        <div
          key={path.join('-')}
          style={{ border: '1px solid #ccc', display: 'flex', flexDirection: 'column', flex: 1 }}
        >
          <div style={{ display: 'flex', gap: '4px', justifyContent: 'flex-end', padding: '6px', border: '2px solid #ccc' }}>
            <button
              onClick={(e) => {
                e.preventDefault()
                openSettings(path)
              }}
              aria-label="Configure widget"
              title="Configure widget"
            >
              ⚙
            </button>
            <button
              onClick={(e) => {
                e.preventDefault()
                setLayout((old) => removeAtPath(old, path))
              }}
              aria-label="Remove widget"
              title="Remove widget"
            >
              🗑
            </button>
          </div>
          <div
            style={{ width: '100%', height: '100%', flex: 1 }}
            onDragOver={allowDrop}
            onDrop={(e) => handleDrop(e, path.slice(0, -1), path[path.length - 1])}
          >
            {Widget ? <Widget {...node.props} /> : null}
          </div>
        </div>
      )
    }
    return null
  }

  function handleSave() {
    saveLayout(layout)
    navigate('/')
  }

  return (
    <div style={{ display: 'flex', height: '100%', padding: '1rem' }}>
      <div style={{ width: 150, marginRight: 10 }}>
        <h3>Palette</h3>
        {palette.map((p, i) => (
          <div
            key={i}
            draggable
            onDragStart={(e) => handleDragStart(e, p.data)}
            style={{ padding: '4px', marginBottom: '4px', border: '1px solid #aaa', cursor: 'grab' }}
          >
            {p.label}
          </div>
        ))}
        <button style={{ marginTop: '1rem' }} onClick={handleSave}>
          Save
        </button>
      </div>
      <DropZone
        onDrop={(e) => handleDrop(e, [])}
        style={{ flex: 1, border: '3px solid #555', padding: 12 }}
      >
        {renderNode(layout, [])}
      </DropZone>
    </div>
  )
}
