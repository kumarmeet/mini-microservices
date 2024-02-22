const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 4003;

app.use(express.json());

const posts = {}

app.post("/events", async (req, res) => {
  const { type, data } = req.body;



  if (type == "CommentCreated") {

    const { id, content, postId } = data;

    const status = content.includes("orange") ? "rejected" : "approved";

    console.log("moderation", { id, status, content, postId })

    await axios.post(`http://localhost:4005/events`, {
      type: "CommentModerated",
      data: {
        id,
        postId,
        status,
        content
      }
    }
    )
  }

  return res.status(200).json({ status: 'OK' })
})

app.listen(PORT, () => {
  console.log(`Moderation -> Server running on port ${PORT}`);
})