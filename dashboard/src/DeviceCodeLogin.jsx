import { useState, useEffect } from 'react'
import QRCode from 'qrcode'

export default function DeviceCodeLogin() {
  const [info, setInfo] = useState(null)
  const [error, setError] = useState(null)
  const [qr, setQr] = useState(null)

  useEffect(() => {
    fetch('/api/login')
      .then((r) => r.json())
      .then((d) => {
        if (!d.verificationUri || !d.userCode) {
          throw new Error('login failed')
        }
        setInfo(d)
        QRCode.toDataURL(d.verificationUri).then(setQr).catch(() => {})
      })
      .catch(() => {
        setError('Failed to start login')
      })
  }, [])

  if (error) return <div>{error}</div>
  if (!info) return <div>Loading...</div>

  return (
    <div style={{ textAlign: 'center' }}>
      {qr && (
        <img
          src={qr}
          alt="login qr"
          style={{ width: 128, height: 128 }}
        />
      )}
      <div>{info.verificationUri}</div>
      <div style={{ fontWeight: 'bold' }}>{info.userCode}</div>
    </div>
  )
}
