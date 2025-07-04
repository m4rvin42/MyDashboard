import './App.css'
import { Link } from 'react-router-dom'
import TestWidget from './TestWidget.jsx'
import DateTimeWidget from './DateTimeWidget.jsx'
import StringWidget from './StringWidget.jsx'
import { VerticalStackPanel, HorizontalStackPanel } from './StackPanels.jsx'
import { loadLayout } from './layout.js'

const widgets = {
  DateTimeWidget,
  StringWidget,
  TestWidget,
}

function renderNode(node, index) {
  if (!node) return null
  if (node.type === 'vertical') {
    return (
      <VerticalStackPanel key={index} style={node.style}>
        {node.children && node.children.map(renderNode)}
      </VerticalStackPanel>
    )
  }
  if (node.type === 'horizontal') {
    return (
      <HorizontalStackPanel key={index} style={node.style}>
        {node.children && node.children.map(renderNode)}
      </HorizontalStackPanel>
    )
  }
  if (node.type === 'widget') {
    const Widget = widgets[node.widget]
    return Widget ? <Widget key={index} {...node.props} /> : null
  }
  return null
}

function App() {
  const layout = loadLayout()
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      {renderNode(layout)}
      <div style={{ position: 'absolute', top: 10, right: 10 }}>
        <Link to="/config">Configure</Link>
      </div>
    </div>
  )
}

export default App
