import { useState, useEffect } from 'react'

export default function DateTimeWidget({
  fontSize = '1rem',
  textColor = 'green',
  backgroundColor = 'red',
} = {}) {
  const [now, setNow] = useState(new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
  const style = {
    border: '1px solid #888',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: textColor,
    backgroundColor,
    fontSize,
    width: '100%',
    height: '100%',
  }
  return (
    <div style={style}>{now.toLocaleString()}</div>
  )
}
