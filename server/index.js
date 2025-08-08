const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Serve static files from the 'src' directory
app.use(express.static(path.join(__dirname, '../src')));

// Define a route to serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../src', 'index.html'));
});

// New route to handle incoming chat messages
app.post('/chat', (req, res) => {
  const message = req.body.message;
  console.log('Received message:', message);
  res.status(200).send('Message received');
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
