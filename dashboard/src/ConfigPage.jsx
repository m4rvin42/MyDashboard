import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loadLayout, saveLayout } from './layout.js'
import { VerticalStackPanel, HorizontalStackPanel } from './StackPanels.jsx'
import DateTimeWidget from './DateTimeWidget.jsx'
import StringWidget from './StringWidget.jsx'
import TestWidget from './TestWidget.jsx'

const widgets = { DateTimeWidget, StringWidget, TestWidget }

const palette = [
  { label: 'Vertical Stack', data: { type: 'vertical', children: [] } },
  { label: 'Horizontal Stack', data: { type: 'horizontal', children: [] } },
  { label: 'DateTimeWidget', data: { type: 'widget', widget: 'DateTimeWidget' } },
  { label: 'StringWidget', data: { type: 'widget', widget: 'StringWidget', props: { text: '' } } },
  { label: 'TestWidget', data: { type: 'widget', widget: 'TestWidget' } },
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

export default function ConfigPage() {
  const navigate = useNavigate()
  const [layout, setLayout] = useState(loadLayout())

  const allowDrop = (e) => e.preventDefault()

  function handleDragStart(e, item) {
    e.dataTransfer.setData('application/json', JSON.stringify(item))
  }

  function handleDrop(e, path, index) {
    e.preventDefault()
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

  function openSettings(path) {
    setLayout((old) =>
      updateAtPath(old, path, (node) => {
        if (node.type === 'widget') {
          if (node.widget === 'StringWidget') {
            const text = prompt('Enter text', node.props?.text || '')
            if (text !== null) {
              return { ...node, props: { text } }
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
      return (
        <div
          key={path.join('-')}
          onDragOver={allowDrop}
          onDrop={(e) => handleDrop(e, path.slice(0, -1), path[path.length - 1])}
          style={{ flex: 1, border: '1px dashed #888', margin: 2, minHeight: 30 }}
        />
      )
    }
    if (node.type === 'vertical' || node.type === 'horizontal') {
      const Panel = node.type === 'vertical' ? VerticalStackPanel : HorizontalStackPanel
      return (
        <Panel
          key={path.join('-')}
          style={{ border: '1px dashed #666', position: 'relative', flex: 1 }}
          onDragOver={allowDrop}
          onDrop={(e) => handleDrop(e, path)}
        >
          {node.children && node.children.map((child, i) => renderNode(child, [...path, i]))}
          <div style={{ position: 'absolute', top: 0, right: 0 }}>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault()
                openSettings(path)
              }}
            >
              Settings
            </a>
          </div>
        </Panel>
      )
    }
    if (node.type === 'widget') {
      const Widget = widgets[node.widget]
      return (
        <div
          key={path.join('-')}
          style={{ position: 'relative', border: '1px solid #ccc', flex: 1 }}
          onDragOver={allowDrop}
          onDrop={(e) => handleDrop(e, path.slice(0, -1), path[path.length - 1])}
        >
          {Widget ? <Widget {...node.props} /> : null}
          <div style={{ position: 'absolute', top: 0, right: 0 }}>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault()
                openSettings(path)
              }}
            >
              Settings
            </a>
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
      <div
        style={{ flex: 1, border: '1px solid #555', padding: 4 }}
        onDragOver={allowDrop}
        onDrop={(e) => handleDrop(e, [])}
      >
        {renderNode(layout, [])}
      </div>
    </div>
  )
}
