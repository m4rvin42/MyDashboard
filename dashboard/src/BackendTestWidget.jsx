import { useState, useEffect } from 'react'

export default function BackendTestWidget({
  endpoint = '/test',
  refreshInterval = 5000,
  showBorder = true,
} = {}) {
  const [message, setMessage] = useState('Loading...')
  useEffect(() => {
    let cancelled = false
    async function fetchData() {
      try {
        const res = await fetch(endpoint)
        const data = await res.json()
        if (!cancelled) {
          setMessage(data.message ?? JSON.stringify(data))
        }
      } catch {
        if (!cancelled) setMessage('Failed to fetch')
      }
    }
    fetchData()
    const id = setInterval(fetchData, refreshInterval)
    return () => {
      cancelled = true
      clearInterval(id)
    }
  }, [endpoint, refreshInterval])

  const style = {
    border: showBorder ? '1px solid #888' : 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  }

  return <div style={style}>{message}</div>
}
