const express = require('express');
const path = require('path');
const axios = require('axios'); // Add axios for HTTP requests

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
app.post('/chat', async (req, res) => { // Make the route handler async
  const message = req.body.message;
  const sessionId = req.body.sessionId;
  console.log('Received message:', message);
  console.log('Received sessionId:', sessionId);

  const webhookUrl = 'http://localhost:5678/webhook/ef449f84-654e-4120-bcfb-8d3fdcada886';

  try {
    // Forward the chat message to the webhook
    const webhookResponse = await axios.post(webhookUrl, { message, sessionId });
    console.log('Message forwarded to webhook successfully.');
    console.log('Webhook response:', webhookResponse.data); // Log the webhook response data
    res.status(200).send('Message received and forwarded');
  } catch (error) {
    console.error('Error forwarding message to webhook:', error.message);
    res.status(500).send('Error forwarding message');
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
