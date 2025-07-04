import { useMemo } from 'react'

function randomColor() {
  return '#' + Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0')
}

export default function TestWidget() {
  const color = useMemo(randomColor, [])
  const style = {
    border: `1px solid ${color}`,
    position: 'relative',
    width: "100%",
    height: "100%",
  }
  return (
    <div style={style}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}
      >
        <line x1="0" y1="0" x2="100" y2="100" stroke={color} strokeWidth="1" />
        <line x1="100" y1="0" x2="0" y2="100" stroke={color} strokeWidth="1" />
      </svg>
    </div>
  )
}
