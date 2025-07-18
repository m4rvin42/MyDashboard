import { useState, useEffect } from 'react'
import LoginQRCode from './LoginQRCode.jsx'

export default function MailWidget({ showBorder = true } = {}) {
  const [loginInfo, setLoginInfo] = useState(null)
  const [mails, setMails] = useState(null)
  const [error, setError] = useState(null)

  const style = {
    border: showBorder ? '1px solid #888' : 'none',
    width: '100%',
    height: '100%',
    overflow: 'auto',
    padding: '4px',
  }

  const bodyStyle = {
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'pre-wrap',
  }

  async function startLogin() {
    try {
      const loginResp = await fetch('/api/login')
      if (!loginResp.ok) throw new Error('login failed')
      const data = await loginResp.json()
      if (!data.loggedIn) {
        if (!data.verificationUri || !data.userCode) {
          throw new Error('login failed')
        }
        setLoginInfo(data)
        setMails(null)
        setError(null)
        return
      }
      setLoginInfo(null)
      setError(null)
      return fetchMails()
    } catch {
      setLoginInfo(null)
      setMails(null)
      setError('Failed to start login')
    }
  }

  async function fetchMails() {
    try {
      const resp = await fetch('/api/mails')
      if (!resp.ok) {
        if (resp.status === 401) {
          return startLogin()
        }
        throw new Error('mail fetch failed')
      }
      const data = await resp.json()
      setMails(data)
      setLoginInfo(null)
      setError(null)
    } catch {
      startLogin()
    }
  }

  useEffect(() => {
    fetchMails()
    const id = setInterval(fetchMails, 60000)
    return () => clearInterval(id)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  if (loginInfo) {
    return (
      <div style={style}>
        <div>Please login:</div>
        <LoginQRCode
          verificationUri={loginInfo.verificationUri}
          userCode={loginInfo.userCode}
        />
      </div>
    )
  }

  if (error) return <div style={style}>{error}</div>
  if (!mails) return <div style={style}>Loading...</div>

  return (
    <div style={style}>
      <ul style={{ padding: 0, margin: 0, listStyle: 'none' }}>
        {mails.map((m) => (
          <li key={m.id} style={{ marginBottom: '4px' }}>
            <strong>{m.subject}</strong>
            <div style={bodyStyle}>{m.bodyPreview || m.body?.content || ''}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}
