import express from 'express'
// fetch is available in Node 20
import { PublicClientApplication } from '@azure/msal-node'

const msalConfig = {
  auth: {
    clientId: process.env.MSAL_CLIENT_ID,
    authority: `https://login.microsoftonline.com/${process.env.MSAL_TENANT_ID}`,
  },
}
const pca = new PublicClientApplication(msalConfig)

let accessToken = null
let loginInProgress = false

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/api/public-ip', (req, res) => {
  res.json({ ip: process.env.PUBLIC_IP || 'unknown' });
});

app.post('/api/outlook/login', async (req, res) => {
  if (loginInProgress) {
    return res.status(400).json({ error: 'Login already in progress' });
  }
  let codeInfo
  let loginError = false
  loginInProgress = true
  const request = {
    deviceCodeCallback: (response) => {
      codeInfo = response
      console.log('Device code:', response.message)
    },
    scopes: ['https://graph.microsoft.com/.default'],
  }

  pca
    .acquireTokenByDeviceCode(request)
    .then((tokenResponse) => {
      accessToken = tokenResponse.accessToken
      loginInProgress = false
      console.log('Login successful for', tokenResponse.account.username)
    })
    .catch((err) => {
      console.error('Login failed', err)
      loginError = true
      loginInProgress = false
    })

  const timeoutMs = 10000
  const start = Date.now()
  while (!codeInfo && !loginError && Date.now() - start < timeoutMs) {
    await new Promise((r) => setTimeout(r, 50))
  }
  if (loginError || !codeInfo) {
    return res.status(500).json({ error: 'login failed' })
  }
  res.json({
    message: codeInfo.message,
    userCode: codeInfo.userCode,
    verificationUri: codeInfo.verificationUri,
  })
})

app.get('/api/outlook/status', (req, res) => {
  res.json({ authenticated: !!accessToken, inProgress: loginInProgress })
})

app.get('/api/mail', async (req, res) => {
  if (!accessToken) {
    return res.status(401).json({ error: 'not authenticated' })
  }
  const folder = req.query.folder || 'Inbox'
  const top = req.query.top || 5
  try {
    const url =
      `https://graph.microsoft.com/v1.0/me/mailFolders/${encodeURIComponent(folder)}/messages?$top=${top}`
    const graphRes = await fetch(url, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    const data = await graphRes.json()
    res.json(data)
  } catch (err) {
    console.error('Failed to fetch messages', err)
    res.status(500).json({ error: 'failed to fetch messages' })
  }
})

app.get('/', (req, res) => {
  res.send('Backend running');
});

app.listen(PORT, () => {
  console.log(`Backend listening on ${PORT}`);
});
