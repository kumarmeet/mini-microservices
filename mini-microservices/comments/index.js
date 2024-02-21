const { randomBytes } = require("node:crypto")
const express = require('express');
const cors = require("cors");
const axios = require("axios");
const app = express();

const PORT = 4001

app.use(cors())

app.use(express.json());

const comments = {}

app.get('/posts/:id/comments', (req, res) => {
  // Handle GET request for posts
  res.status(200).json({ message: 'Fetching posts', comment: comments[req.params.id] || [] });
});

app.post('/posts/:id/comments', async (req, res) => {
  // Handle POST request to create a new post
  const { content } = req.body;

  const id = randomBytes(4).toString('hex');

  const createdComments = comments[req.params.id] || []

  createdComments.push({
    id,
    content
  });

  comments[req.params.id] = createdComments

  await axios.post("http://localhost:4005/events", {
    type: "CommentCreated",
    data: {
      id,
      content,
      postId: req.params.id
    }
  });

  res.status(201).json({ message: 'Post created', comments: comments[id] });
});

app.post('/events', (req, res) => {
  console.log('Received Event', req.body.type);
  return res.status(200).json({ status: 'OK' });
})


app.listen(PORT, () => {
  console.log(`Comments -> Server running on port ${PORT}`);
});
