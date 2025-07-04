import './App.css'
import TestWidget from './TestWidget.jsx'
import DateTimeWidget from './DateTimeWidget.jsx'
import StringWidget from './StringWidget.jsx'
import { VerticalStackPanel, HorizontalStackPanel } from './StackPanels.jsx'

function App() {
  return (
    <VerticalStackPanel>
      <HorizontalStackPanel style={{ flex: 1 }}>
        <DateTimeWidget />
        <StringWidget text="Hello from StringWidget" />
      </HorizontalStackPanel>
      <HorizontalStackPanel style={{ flex: 1 }}>
        <TestWidget />
        <TestWidget />
        <TestWidget />
      </HorizontalStackPanel>
      <HorizontalStackPanel style={{ flex: 1 }}>
        <TestWidget />
        <TestWidget />
        <TestWidget />
      </HorizontalStackPanel>
    </VerticalStackPanel>
  )
}

export default App
