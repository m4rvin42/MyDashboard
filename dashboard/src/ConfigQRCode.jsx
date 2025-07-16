import { useEffect, useState } from 'react'
import QRCode from 'qrcode'

export default function ConfigQRCode() {
  const [qr, setQr] = useState(null)
  const [url, setUrl] = useState('')

  useEffect(() => {
    const base =
      typeof window !== 'undefined' && window.PUBLIC_IP
        ? `http://${window.PUBLIC_IP}:8080`
        : window.location.origin
    const configUrl = `${base.replace(/\/$/, '')}/config`
    setUrl(configUrl)
    QRCode.toDataURL(configUrl).then(setQr).catch(() => {})
  }, [])

  if (!qr) return <div>Loading...</div>

  return (
    <div style={{ textAlign: 'center' }}>
      <img src={qr} alt="config qr" style={{ width: 128, height: 128 }} />
      <div>{url}</div>
    </div>
  )
}
