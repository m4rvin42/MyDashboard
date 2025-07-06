import { useEffect, useState } from 'react'

export default function MailWidget({
  clientId,
  tenant = 'common',
  scopes = 'https://graph.microsoft.com/Mail.Read https://graph.microsoft.com/User.Read',
  numMessages = 5,
  showBorder = true,
} = {}) {
  const [messages, setMessages] = useState(null)
  const [deviceInfo, setDeviceInfo] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!clientId) return
    fetchMessages()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientId])

  async function startDeviceCodeFlow() {
    try {
      const resp = await fetch('/api/device-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clientId, tenant, scopes }),
      })
      const data = await resp.json()
      if (!resp.ok) throw new Error(data.error || 'Failed to obtain device code')
      setDeviceInfo({ ...data, interval: 5000 })
      pollForToken()
    } catch (err) {
      setError(err.message)
    }
  }

  async function pollForToken() {
    while (true) {
      await new Promise((r) => setTimeout(r, 5000))
      try {
        const resp = await fetch('/api/poll-token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ clientId, tenant }),
        })
        const data = await resp.json()
        if (resp.ok && data.success) {
          setDeviceInfo(null)
          fetchMessages()
          break
        }
        if (!data.pending) throw new Error(data.error || 'Failed to obtain token')
      } catch (err) {
        setError(err.message)
        break
      }
    }
  }

  async function fetchMessages() {
    try {
      const resp = await fetch(`/api/messages?clientId=${clientId}&numMessages=${numMessages}`)
      const data = await resp.json()
      if (resp.ok) {
        setMessages(data)
      } else if (resp.status === 401) {
        startDeviceCodeFlow()
      } else {
        throw new Error(data.error || 'Failed to load messages')
      }
    } catch (err) {
      setError(err.message)
    }
  }

  const style = {
    border: showBorder ? '1px solid #888' : 'none',
    padding: '0.5rem',
    overflow: 'auto',
    width: '100%',
    height: '100%',
  }

  if (error) return <div style={style}>Error: {error}</div>
  if (!clientId) return <div style={style}>Configure clientId</div>
  if (deviceInfo) {
    return (
      <div style={style}>
        <div>Please authenticate:</div>
        <div>URL: {deviceInfo.verification_uri}</div>
        <div>Code: {deviceInfo.user_code}</div>
      </div>
    )
  }
  if (!messages) return <div style={style}>Loading...</div>
  return (
    <div style={style}>
      <ul style={{ paddingLeft: 20 }}>
        {messages.map((m) => (
          <li key={m.id}>{m.subject || '(no subject)'}</li>
        ))}
      </ul>
    </div>
  )
}
