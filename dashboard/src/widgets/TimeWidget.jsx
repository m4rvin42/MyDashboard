import { useEffect, useState } from 'react'
import ContentControl from '../components/ContentControl'

export default function TimeWidget({
  verticalContentAlignment,
  horizontalContentAlignment,
}) {
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    console.log('TimeWidget mounted')
    const interval = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <ContentControl
      verticalContentAlignment={verticalContentAlignment}
      horizontalContentAlignment={horizontalContentAlignment}
    >
      <div data-testid="time-widget">Time: {now.toLocaleString()}</div>
    </ContentControl>
  )
}
