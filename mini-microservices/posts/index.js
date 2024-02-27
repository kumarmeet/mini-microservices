const { randomBytes } = require("node:crypto")
const express = require('express');
const axios = require('axios');
const cors = require("cors");
const app = express();

const PORT = 4000;

app.use(cors())

app.use(express.json());

const posts = {}

app.get('/posts', (req, res) => {
  // Handle GET request for posts
  res.status(200).json({ message: 'Fetching posts', posts });
});

app.post('/posts', async (req, res) => {
  // Handle POST request to create a new post
  const { title } = req.body;

  const id = randomBytes(4).toString('hex');

  await axios.post("http://localhost:4005/events", {
    type: "PostCreated",
    data: {
      id,
      title
    }
  });

  posts[id] = {
    id,
    title
  };
  res.status(201).json({ message: 'Post created', post: posts[id] });
});

app.post('/events', (req, res) => {
  console.log('Received Event', req.body.type);
  return res.status(200).json({ status: 'OK' });
})

app.listen(PORT, () => {
  console.log("latest updation11119999")
  console.log(`Posts -> Server running on port ${PORT}`);
});

