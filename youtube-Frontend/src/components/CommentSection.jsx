import { useEffect, useState } from "react";
import API from "../api/axios";

function CommentSection({ videoId }) {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  const fetchComments = () => {
    API.get(`/comments/${videoId}`).then((res) =>
      setComments(res.data)
    );
  };

  useEffect(fetchComments, []);

  const addComment = async () => {
    await API.post("/comments", { text, videoId });
    setText("");
    fetchComments();
  };

  return (
    <div>
      <h3>Comments</h3>

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add comment"
      />
      <button onClick={addComment}>Post</button>

      {comments.map((c) => (
        <p key={c._id}>
          <b>{c.user.name}</b>: {c.text}
        </p>
      ))}
    </div>
  );
}

export default CommentSection;