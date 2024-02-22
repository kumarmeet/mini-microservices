// eslint-disable-next-line react/prop-types
const CommentList = ({ comments }) => {
  // eslint-disable-next-line react/prop-types
  const renderedComments = comments.length ? (
    // eslint-disable-next-line react/prop-types
    comments.map((comment) => {
      let content;

      if (comment.status === "approved") {
        content = comment.content;
      }

      if (comment.status === "rejected") {
        content = "This commnet has been rejected";
      }

      if (comment.status === "pending") {
        content = "This commnet is awating moderation";
      }

      return <li key={comment.id}>{content}</li>;
    })
  ) : (
    <li>No comments yet</li>
  );

  return <ul>{renderedComments}</ul>;
};

export default CommentList;
