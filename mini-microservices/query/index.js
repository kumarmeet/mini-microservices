const express = require('express');
const cors = require("cors");
const axios = require("axios");
const app = express();
const PORT = 4002;

app.use(cors())
app.use(express.json());

const posts = {}

const handleEvent = (type, data) => {

  if (type === "PostCreated") {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] }
  }

  if (type == "CommentCreated") {
    const { id, content, postId, status } = data;
    const post = posts[postId]
    post.comments.push({ id, content, status })
  }

  if (type == "CommentUpdated") {
    const { id, content, postId, status } = data;
    const post = posts[postId]

    const comment = post.comments.find(comment => {
      return comment.id === id
    })

    comment.status = status
    comment.content = content
  }

  console.log(9999)
}


app.get('/posts', (req, res) => {
  return res.status(200).json({ message: 'Fetching posts', posts });
});


/**
 * sample data
 * {type: 'PostCreated', data: { id: '2f9d6677', title: 'asdf' } }}
 * {type: 'CommentCreated', data: { id: '2bd01cb1', content: 'asdf', postId: '2f9d6677' }}
 */
app.post("/events", (req, res) => {
  const { type, data } = req.body;
  console.log(454511)
  handleEvent(type, data);

  console.log(posts)

  return res.status(200).json({ status: 'OK' })
})

app.listen(PORT, async () => {
  console.log(`Query -> Server running on port ${PORT}`);

  try {
    const res = await axios.get("http://event-bus-srv:4005/events");

    for (const event of res.data.events) {
      console.log("Processing event: ", event.type);

      handleEvent(event.type, event.data);
    }
  } catch (error) {
    console.log(error.message)
  }
})