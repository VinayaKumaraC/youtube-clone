import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api/axios";

export default function VideoPage() {
  const { id } = useParams();
  const [video, setVideo] = useState({});
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    API.get(`/videos/${id}`).then(res => setVideo(res.data));
    API.get(`/comments/${id}`).then(res => setComments(res.data));
  }, [id]);

  const addComment = async () => {
    await API.post("/comments", { text, videoId: id });
    alert("Comment added");
  };

  return (
    <div>
      <video src={video.videoUrl} controls width="600" />
      <h2>{video.title}</h2>

      <button onClick={()=>API.put(`/videos/${id}/like`)}>👍</button>
      <button onClick={()=>API.put(`/videos/${id}/dislike`)}>👎</button>

      <h3>Comments</h3>
      <input onChange={(e)=>setText(e.target.value)} />
      <button onClick={addComment}>Add</button>

      {comments.map(c => (
        <p key={c._id}>{c.user?.name}: {c.text}</p>
      ))}
    </div>
  );
}