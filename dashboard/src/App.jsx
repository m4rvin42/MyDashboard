import './App.css'

import ConfigQRCode from './ConfigQRCode.jsx'
import TestWidget from './TestWidget.jsx'
import BackendTestWidget from './BackendTestWidget.jsx'
import DateTimeWidget from './DateTimeWidget.jsx'
import StringWidget from './StringWidget.jsx'
import MailWidget from './MailWidget.jsx'
import { VerticalStackPanel, HorizontalStackPanel } from './StackPanels.jsx'
import { loadLayout } from './layout.js'

const widgets = {
  DateTimeWidget,
  StringWidget,
  BackendTestWidget,
  MailWidget,
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
    return Widget ? <Widget key={index} showBorder={false} {...node.props} /> : null
  }
  return null
}

function App() {
//<<<<<<< Feature/presistence
  const [layout, setLayout] = useState(null)
  const ip = window.PUBLIC_IP || 'unknown'
  const [backendIp, setBackendIp] = useState('...')

  useEffect(() => {
    loadLayout().then(setLayout)
  }, [])

  useEffect(() => {
    fetch('/api/public-ip')
      .then((r) => r.json())
      .then((d) => setBackendIp(d.ip))
      .catch(() => setBackendIp('error'))
  }, [])
  if (!layout) return null
//=======
//  const layout = loadLayout()
//>>>>>>> main
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      {renderNode(layout)}
      <div style={{ position: 'absolute', top: 10, right: 10 }}>
        <ConfigQRCode />
      </div>
    </div>
  )
}

export default App
