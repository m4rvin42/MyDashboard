import { useState } from 'react'
import VerticalStackPanel from './components/VerticalStackPanel'
import HorizontalStackPanel from './components/HorizontalStackPanel'
import TimeWidget from './widgets/TimeWidget'
import TextWidget from './widgets/TextWidget'
import './App.css'

export default function App() {
  const [debug, setDebug] = useState(false)

  return (
    <div className={debug ? 'debug' : ''}>
      <button onClick={() => setDebug((d) => !d)}>Toggle Debug</button>
      <VerticalStackPanel>
        <TimeWidget
          verticalContentAlignment="Top"
          horizontalContentAlignment="Center"
        />
        <HorizontalStackPanel>
          <TextWidget
            text="Top Left"
            verticalContentAlignment="Top"
            horizontalContentAlignment="Left"
          />
          <TextWidget
            text="Centered"
            verticalContentAlignment="Center"
            horizontalContentAlignment="Center"
          />
          <TextWidget
            text="Bottom Right"
            verticalContentAlignment="Bottom"
            horizontalContentAlignment="Right"
          />
        </HorizontalStackPanel>
      </VerticalStackPanel>
    </div>
  )
}
