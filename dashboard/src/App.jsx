import { useState } from 'react'
import VerticalStackPanel from './components/VerticalStackPanel'
import HorizontalStackPanel from './components/HorizontalStackPanel'
import TimeWidget from './widgets/TimeWidget'
import TextWidget from './widgets/TextWidget'
import './App.css'

export default function App() {
  const debug = true

  return (
    <VerticalStackPanel debug={debug}>
      <TimeWidget verticalContentAlignment="Center" horizontalContentAlignment="Right" />
      <HorizontalStackPanel debug={debug}>
        <TextWidget text="Welcome to the dashboard!" verticalContentAlignment="Top" horizontalContentAlignment="Left" />
        <TextWidget text="Enjoy your stay." verticalContentAlignment="Center" horizontalContentAlignment="Center" />
        <TextWidget text="Another example entry." verticalContentAlignment="Bottom" horizontalContentAlignment="Right" />
      </HorizontalStackPanel>
      <HorizontalStackPanel debug={debug}>
        <TextWidget text="Dashboard rules!" verticalContentAlignment="Center" horizontalContentAlignment="Left" />
        <TextWidget text="One more widget." verticalContentAlignment="Center" horizontalContentAlignment="Right" />
      </HorizontalStackPanel>
    </VerticalStackPanel>

  )
}
