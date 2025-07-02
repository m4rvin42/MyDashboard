import VerticalStackPanel from './components/VerticalStackPanel'
import HorizontalStackPanel from './components/HorizontalStackPanel'
import TimeWidget from './widgets/TimeWidget'
import TextWidget from './widgets/TextWidget'
import './App.css'

export default function App() {
  return (
    <VerticalStackPanel>
      <TimeWidget />
      <HorizontalStackPanel>
        <TextWidget text="Welcome to the dashboard!" />
        <TextWidget text="Enjoy your stay." />
      </HorizontalStackPanel>
    </VerticalStackPanel>
  )
}
