import express from 'express'
import axios from 'axios'
import { PublicClientApplication } from '@azure/msal-node'
import { readFile, writeFile } from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const msalConfig = {
  auth: {
    clientId: '4a191de7-0945-4f14-8d67-2c4fa2aa0c72',
    authority: 'https://login.microsoftonline.com/consumers',
  },
}

const pca = new PublicClientApplication(msalConfig)

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const layoutPath = path.join(__dirname, 'layout.json')

let accessToken = null
let loginPromise = null
let deviceCodeInfo = null

function startLogin() {
  if (accessToken) return Promise.resolve({ loggedIn: true })
  if (!loginPromise) {
    deviceCodeInfo = null
    loginPromise = pca
      .acquireTokenByDeviceCode({
        deviceCodeCallback: (resp) => {
          deviceCodeInfo = {
            message: resp.message,
            userCode: resp.userCode,
            verificationUri: resp.verificationUri,
          }
        },
        scopes: ['User.Read', 'Mail.Read'],
      })
      .then((res) => {
        accessToken = res.accessToken
        loginPromise = null
        deviceCodeInfo = null
      })
      .catch((err) => {
        console.error('Device code auth failed', err)
        loginPromise = null
        deviceCodeInfo = null
      })
  }
  return new Promise((resolve, reject) => {
    const check = () => {
      if (deviceCodeInfo) {
        resolve(deviceCodeInfo)
      } else if (!loginPromise) {
        reject(new Error('Failed to start login'))
      } else {
        setTimeout(check, 100)
      }
    }
    check()
  })
}

async function ensureAccessToken() {
  if (accessToken) return accessToken
  if (loginPromise) {
    await loginPromise
    if (accessToken) return accessToken
  }
  throw new Error('Not authenticated')
}

async function fetchMails() {
  const token = await ensureAccessToken()
  const endpoint =
    'https://graph.microsoft.com/v1.0/me/mailFolders/inbox/messages?$top=5'
  const { data } = await axios.get(endpoint, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return data.value
}

async function loadLayoutFile() {
  try {
    const data = await readFile(layoutPath, 'utf8')
    return JSON.parse(data)
  } catch {
    return null
  }
}

async function saveLayoutFile(layout) {
  try {
    await writeFile(layoutPath, JSON.stringify(layout, null, 2), 'utf8')
    return true
  } catch {
    return false
  }
}

const app = express();
app.use(express.json())
const PORT = process.env.PORT || 3000;

app.get('/api/public-ip', (req, res) => {
  res.json({ ip: process.env.PUBLIC_IP || 'unknown' });
});

app.get('/api/login', async (req, res) => {
  try {
    const info = await startLogin()
    res.json(info)
  } catch (err) {
    res.status(500).json({ error: 'login failed' })
  }
})

app.get('/api/mails', async (req, res) => {
  try {
    const mails = await fetchMails()
    res.json(mails)
  } catch (err) {
    res.status(401).json({ error: 'not authenticated' })
  }
})

app.post('/api/logout', async (req, res) => {
  accessToken = null
  loginPromise = null
  deviceCodeInfo = null
  try {
    await pca.getTokenCache().clear()
  } catch (err) {
    console.error('Failed to clear token cache', err)
  }
  res.json({ loggedOut: true })
})

app.get('/api/layout', async (req, res) => {
  const layout = await loadLayoutFile()
  if (layout) return res.json(layout)
  res.status(404).json({ error: 'layout not found' })
})

app.post('/api/layout', async (req, res) => {
  const layout = req.body
  if (!layout || typeof layout !== 'object') {
    return res.status(400).json({ error: 'invalid layout' })
  }
  const ok = await saveLayoutFile(layout)
  if (ok) return res.json({ saved: true })
  res.status(500).json({ error: 'failed to save layout' })
})

app.get('/', (req, res) => {
  res.send('Backend running');
});

app.listen(PORT, () => {
  console.log(`Backend listening on ${PORT}`);
});
