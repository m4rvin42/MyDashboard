import { useState, useEffect } from 'react'

export default function MailWidget({
  mailFolder = 'Inbox',
  maxMessages = 5,
  showBorder = true,
} = {}) {
  const [messages, setMessages] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    const url = `/api/mail?folder=${encodeURIComponent(mailFolder)}&top=${maxMessages}`
    console.log('MailWidget: fetching', url)
    fetch(url)
      .then(async (r) => {
        if (r.status === 401) {
          console.log('MailWidget: not authenticated, starting login')
          const loginRes = await fetch('/api/outlook/login', { method: 'POST' })
          const loginInfo = await loginRes.json()
          console.log('MailWidget: device code info', loginInfo)
          setStatus(loginInfo.message)
          return null
        }
        if (!r.ok) throw new Error(`HTTP ${r.status}`)
        return r.json()
      })
      .then((d) => {
        if (d) {
          console.log('MailWidget: messages received', d)
          setMessages(d.value || [])
          setStatus('ok')
        }
      })
      .catch((e) => {
        console.error('MailWidget: error', e)
        setStatus('error')
      })
  }, [mailFolder, maxMessages])

  const style = {
    border: showBorder ? '1px solid #888' : 'none',
    padding: '4px',
    overflow: 'auto',
    width: '100%',
    height: '100%',
  }

  if (status !== 'ok') return <div style={style}>{status}</div>

  return (
    <div style={style}>
      <ul>
        {messages.map((m) => (
          <li key={m.id}>{m.subject}</li>
        ))}
      </ul>
    </div>
  )
}
