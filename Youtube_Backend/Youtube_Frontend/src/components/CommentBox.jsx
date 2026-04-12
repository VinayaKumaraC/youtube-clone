// handles comment add + display

import { useEffect, useState } from "react";
import API from "../api/axios";

function CommentBox({ videoId }) {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  // fetch comments
  const fetchComments = async () => {
    const res = await API.get(`/comments/${videoId}`);
    setComments(res.data);
  };

  useEffect(() => {
    fetchComments();
  }, [videoId]);

  // add comment
  const addComment = async () => {
    await API.post("/comments", {
      text,
      videoId,
    });

    setText("");
    fetchComments();
  };

  return (
    <div>
      <h3>Comments</h3>

      <input
        placeholder="Add comment"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={addComment}>Post</button>

      {comments.map((c) => (
        <p key={c._id}>
          <strong>{c.user?.username}</strong>: {c.text}
        </p>
      ))}
    </div>
  );
}

export default CommentBox;