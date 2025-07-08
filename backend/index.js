import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/api/public-ip', (req, res) => {
  res.json({ ip: process.env.PUBLIC_IP || 'unknown' });
});

app.get('/', (req, res) => {
  res.send('Backend running');
});

app.listen(PORT, () => {
  console.log(`Backend listening on ${PORT}`);
});
