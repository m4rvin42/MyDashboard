const https = require('https');

https.get('https://www.google.com', (res) => {
  console.log('Status code:', res.statusCode);
  res.on('data', () => {}); // consume data
  res.on('end', () => {
    console.log('Request completed');
  });
}).on('error', (err) => {
  console.error('Request failed:', err);
});
