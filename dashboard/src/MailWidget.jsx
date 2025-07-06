import { useEffect, useState } from 'react'

export default function MailWidget({
  clientId,
  tenant = 'common',
  scopes = 'https://graph.microsoft.com/Mail.Read https://graph.microsoft.com/User.Read',
  numMessages = 5,
  showBorder = true,
} = {}) {
  const [token, setToken] = useState(null)
  const [messages, setMessages] = useState(null)
  const [deviceInfo, setDeviceInfo] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const stored = localStorage.getItem(`mailWidgetToken:${clientId}`)
    if (stored) {
      try {
        const data = JSON.parse(stored)
        if (data.expires_at > Date.now()) {
          setToken(data.access_token)
        }
      } catch {
        // ignore stored token parse errors
      }
    }
  }, [clientId])

  useEffect(() => {
    if (!clientId) return
    if (!token && !deviceInfo && !error) {
      startDeviceCodeFlow()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientId, token, deviceInfo, error])

  useEffect(() => {
    if (token && !messages && !error) {
      fetchMessages(token)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, messages, error])

  async function startDeviceCodeFlow() {
    try {
      const params = new URLSearchParams()
      params.append('client_id', clientId)
      params.append('scope', scopes)
      const resp = await fetch(`https://login.microsoftonline.com/${tenant}/oauth2/v2.0/devicecode`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString(),
      })
      const data = await resp.json()
      if (!resp.ok) throw new Error(data.error_description || 'Failed to obtain device code')
      setDeviceInfo(data)
      pollForToken(data.device_code, data.interval * 1000)
    } catch (err) {
      setError(err.message)
    }
  }

  async function pollForToken(deviceCode, intervalMs) {
    while (true) {
      await new Promise((r) => setTimeout(r, intervalMs))
      try {
        const params = new URLSearchParams()
        params.append('grant_type', 'urn:ietf:params:oauth:grant-type:device_code')
        params.append('client_id', clientId)
        params.append('device_code', deviceCode)
        const resp = await fetch(`https://login.microsoftonline.com/${tenant}/oauth2/v2.0/token`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: params.toString(),
        })
        const data = await resp.json()
        if (resp.ok) {
          const expiresAt = Date.now() + data.expires_in * 1000
          localStorage.setItem(`mailWidgetToken:${clientId}`, JSON.stringify({ access_token: data.access_token, expires_at: expiresAt }))
          setDeviceInfo(null)
          setToken(data.access_token)
          break
        }
        if (data.error !== 'authorization_pending') throw new Error(data.error_description || 'Failed to obtain token')
      } catch (err) {
        setError(err.message)
        break
      }
    }
  }

  async function fetchMessages(tok) {
    try {
      const resp = await fetch(`https://graph.microsoft.com/v1.0/me/messages?$top=${numMessages}`, {
        headers: { Authorization: `Bearer ${tok}` },
      })
      const data = await resp.json()
      if (!resp.ok) throw new Error(data.error?.message || 'Failed to load messages')
      setMessages(data.value)
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
