import { useEffect, useState } from 'react'
import QRCode from 'qrcode'

export default function LoginQRCode({ verificationUri, userCode }) {
  const [qr, setQr] = useState(null)

  useEffect(() => {
    if (!verificationUri) return
    QRCode.toDataURL(verificationUri).then(setQr).catch(() => {})
  }, [verificationUri])

  if (!verificationUri || !userCode) return null

  return (
    <div style={{ textAlign: 'center' }}>
      {qr && (
        <img
          src={qr}
          alt="login qr"
          style={{ width: 128, height: 128 }}
        />
      )}
      <div>{verificationUri}</div>
      <div style={{ fontWeight: 'bold' }}>{userCode}</div>
    </div>
  )
}
