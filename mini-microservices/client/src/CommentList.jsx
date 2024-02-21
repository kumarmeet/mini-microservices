import { useState, useEffect } from "react";
import axios from "axios";

// eslint-disable-next-line react/prop-types
const CommentList = ({ postId }) => {
  const [comments, setComments] = useState([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchData = async () => {
    const res = await axios.get(
      `http://localhost:4001/posts/${postId}/comments`
    );

    setComments(res.data.comment);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderedComments = comments.length ? (
    comments.map((comment) => {
      return <li key={comment.id}>{comment.content}</li>;
    })
  ) : (
    <li>No comments yet</li>
  );

  return <ul>{renderedComments}</ul>;
};

export default CommentList;
