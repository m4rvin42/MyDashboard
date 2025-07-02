import { useEffect, useState } from 'react'

export default function TimeWidget() {
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    console.log('TimeWidget mounted')
    const interval = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div data-testid="time-widget">Time: {now.toLocaleString()}</div>
  )
}
