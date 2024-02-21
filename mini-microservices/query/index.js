const express = require('express');
const cors = require("cors");
const app = express();
const PORT = 4002;

app.use(express.json());
app.use(cors())

const commentsByPostId = {}

app.get('/posts', (req, res) => {
  // Handle GET request for posts
  res.status(200).json({ message: 'Fetching posts', comments: commentsByPostId[req.params.id] || [] });
});

app.post("events", async (req, res) => {
  const { type, data } = req.body;

  console.log(type, data);

  if (type === "CommentCreated") {
    const { id, content, postId } = data;
    const comments = commentsByPostId[postId] || [];
    comments.push({ id, content });
    commentsByPostId[postId] = comments;
  }

  if (type === "PostCreated") {
    const { id, title } = data;
    commentsByPostId[id] = [];
  }

  res.send({});
})

app.listen(PORT, () => {
  console.log(`Query -> Server running on port ${PORT}`);
})