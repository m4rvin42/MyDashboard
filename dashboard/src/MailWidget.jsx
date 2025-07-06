import { useEffect, useState } from 'react'

export default function MailWidget({ showBorder = true } = {}) {
  const [mails, setMails] = useState(null)

  useEffect(() => {
    fetch('http://localhost:3001/api/mails')
      .then((res) => res.json())
      .then(setMails)
      .catch((err) => console.error('Failed to load mails', err))
  }, [])

  const style = {
    border: showBorder ? '1px solid #888' : 'none',
    padding: '0.5rem',
    overflow: 'auto',
    width: '100%',
    height: '100%',
  }

  if (!mails) {
    return <div style={style}>Loading mails...</div>
  }

  return (
    <div style={style}>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {mails.map((mail) => (
          <li key={mail.id} style={{ marginBottom: '0.5rem' }}>
            <strong>{mail.subject}</strong>
            <div>{mail.snippet}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}
