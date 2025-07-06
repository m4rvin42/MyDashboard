import express from 'express'
import cors from 'cors'

const app = express()
const PORT = process.env.PORT || 3001

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:5000',
]
app.use(cors({ origin: allowedOrigins }))

app.get('/api/mails', (_req, res) => {
  res.json([
    { id: 1, from: 'alice@example.com', subject: 'Welcome', snippet: 'Hello from Alice' },
    { id: 2, from: 'bob@example.com', subject: 'Meeting', snippet: 'About meeting schedule' },
    { id: 3, from: 'carol@example.com', subject: 'Greetings', snippet: 'Just saying hi' },
  ])
})

app.get('/', (_req, res) => {
  res.json({ message: 'Mail server running' })
})

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`)
})
