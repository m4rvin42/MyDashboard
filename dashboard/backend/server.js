import express from 'express'
import fetch from 'node-fetch'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
app.use(express.json())

app.get('/api/test', (req, res) => {
  res.json({ ok: true })
})

const tokens = new Map()

app.post('/api/device-code', async (req, res) => {
  const { clientId, tenant = 'common', scopes } = req.body || {}
  if (!clientId) return res.status(400).json({ error: 'clientId required' })
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
    if (!resp.ok) return res.status(400).json({ error: data.error_description || 'Failed to obtain device code' })
    tokens.set(clientId, { device_code: data.device_code, interval: data.interval * 1000 })
    res.json({ verification_uri: data.verification_uri, user_code: data.user_code })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.post('/api/poll-token', async (req, res) => {
  const { clientId, tenant = 'common' } = req.body || {}
  const entry = tokens.get(clientId)
  if (!entry) return res.status(400).json({ error: 'No device code. Start auth first.' })
  try {
    const params = new URLSearchParams()
    params.append('grant_type', 'urn:ietf:params:oauth:grant-type:device_code')
    params.append('client_id', clientId)
    params.append('device_code', entry.device_code)
    const resp = await fetch(`https://login.microsoftonline.com/${tenant}/oauth2/v2.0/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
    })
    const data = await resp.json()
    if (resp.ok) {
      entry.access_token = data.access_token
      entry.expires_at = Date.now() + data.expires_in * 1000
      return res.json({ success: true })
    }
    if (data.error === 'authorization_pending') return res.json({ pending: true })
    res.status(400).json({ error: data.error_description || 'Failed to obtain token' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.get('/api/messages', async (req, res) => {
  const { clientId, numMessages = 5 } = req.query
  const entry = tokens.get(clientId)
  if (!entry || !entry.access_token || entry.expires_at <= Date.now()) {
    return res.status(401).json({ error: 'No valid token. Authenticate first.' })
  }
  try {
    const resp = await fetch(`https://graph.microsoft.com/v1.0/me/messages?$top=${numMessages}`, {
      headers: { Authorization: `Bearer ${entry.access_token}` },
    })
    const data = await resp.json()
    if (!resp.ok) return res.status(400).json({ error: data.error?.message || 'Failed to load messages' })
    res.json(data.value)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Serve static files
const distPath = path.join(__dirname, '../dist')
app.use(express.static(distPath))
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'))
})

const port = process.env.PORT || 80
app.listen(port, () => console.log(`Server listening on port ${port}`))
