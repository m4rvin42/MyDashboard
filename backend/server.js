const express = require('express');
const app = express();
const PORT = 3000;
app.get('/test', (req, res) => {
  res.json({ message: 'Backend is running' });
});
app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
});
