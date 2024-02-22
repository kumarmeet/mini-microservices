const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 4005;
app.use(express.json());

const events = []

app.post('/events', async (req, res) => {
  const event = req.body;

  events.push(event);

  console.log("event-bus", event, events)

  try {
    await axios.post("http://localhost:4000/events", event);
    await axios.post("http://localhost:4001/events", event);
    await axios.post("http://localhost:4002/events", event);
    await axios.post("http://localhost:4003/events", event);
  } catch (error) {
    console.log(error.message);
  }

  return res.status(200).send({ status: 'OK' });
})

app.get('/events', (req, res) => {
  return res.status(200).json({ message: 'Fetching events', events });
});

app.listen(PORT, () => {
  console.log(`Event Bus -> Server running on port ${PORT}`);
});