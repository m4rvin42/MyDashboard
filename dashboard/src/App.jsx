import './App.css'
import TestWidget from './TestWidget.jsx'
import { VerticalStackPanel, HorizontalStackPanel } from './StackPanels.jsx'

function App() {
  return (
    <VerticalStackPanel>
      <HorizontalStackPanel style={{ flex: 1 }}>
        <TestWidget />
        <TestWidget />
      </HorizontalStackPanel>
      <HorizontalStackPanel style={{ flex: 1 }}>
        <TestWidget />
        <TestWidget />
      </HorizontalStackPanel>
    </VerticalStackPanel>
  )
}

export default App
