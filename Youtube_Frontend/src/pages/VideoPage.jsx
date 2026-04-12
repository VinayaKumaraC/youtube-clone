import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";

export default function VideoPage() {
  const { id } = useParams();
  const [video, setVideo] = useState({});
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    API.get(`/videos/${id}`).then((res) => setVideo(res.data));
    API.get(`/comments/${id}`).then((res) => setComments(res.data));
  }, [id]);

  const like = () => API.put(`/videos/${id}/like`);
  const dislike = () => API.put(`/videos/${id}/dislike`);

  const addComment = async () => {
    await API.post("/comments", { videoId: id, text });
    setText("");
  };

  return (
    <div>
      <h2>{video.title}</h2>

      <video src={video.videoUrl} controls width="600" />

      <div>
        <button onClick={like}>👍</button>
        <button onClick={dislike}>👎</button>
      </div>

      <h3>Comments</h3>
      {comments.map((c) => (
        <p key={c.id}>{c.text}</p>
      ))}

      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={addComment}>Add Comment</button>
    </div>
  );
}