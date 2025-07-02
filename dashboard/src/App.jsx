import VerticalStackPanel from './components/VerticalStackPanel'
import HorizontalStackPanel from './components/HorizontalStackPanel'
import TimeWidget from './widgets/TimeWidget'
import TextWidget from './widgets/TextWidget'
import './App.css'

export default function App() {
  const debug = true

  return (
    <VerticalStackPanel debug={debug}>
      <TimeWidget />
      <HorizontalStackPanel debug={debug}>
        <TextWidget text="Welcome to the dashboard!" />
        <TextWidget text="Enjoy your stay." />
        <TextWidget text="Another example entry." />
      </HorizontalStackPanel>
      <HorizontalStackPanel debug={debug}>
        <TextWidget text="Dashboard rules!" />
        <TextWidget text="One more widget." />
      </HorizontalStackPanel>
    </VerticalStackPanel>
  )
}
