import { useState, useEffect } from 'react'

export default function BackendTestWidget({ showBorder = true } = {}) {
  const [status, setStatus] = useState('loading...')
  useEffect(() => {
    fetch('/api/public-ip')
      .then((r) => r.json())
      .then((d) => setStatus(`Backend IP: ${d.ip}`))
      .catch(() => setStatus('error'))
  }, [])
  const style = {
    border: showBorder ? '1px solid #888' : 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  }
  return <div style={style}>{status}</div>
}
