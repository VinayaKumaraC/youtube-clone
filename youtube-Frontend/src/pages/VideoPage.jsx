import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const VideoPage = () => {
  const { id } = useParams();

  const [video, setVideo] = useState(null);
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchVideo();
    fetchComments();
  }, []);

  const fetchVideo = async () => {
    const res = await axios.get(`http://localhost:9090/api/videos/${id}`);
    setVideo(res.data);
  };

  const fetchComments = async () => {
    const res = await axios.get(`http://localhost:9090/api/comments/${id}`);
    setComments(res.data);
  };

  const addComment = async () => {
    await axios.post(
      "http://localhost:9090/api/comments",
      { text, videoId: id },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setText("");
    fetchComments();
  };

  const like = async () => {
    await axios.put(
      `http://localhost:9090/api/videos/${id}/like`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchVideo();
  };

  const dislike = async () => {
    await axios.put(
      `http://localhost:9090/api/videos/${id}/dislike`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchVideo();
  };

  if (!video) return <p className="text-white p-5">Loading...</p>;

  return (
    <div className="bg-black text-white min-h-screen p-5">

      <div className="flex gap-6">

        {/* VIDEO */}
        <div className="flex-1">
          <video src={video.videoUrl} controls className="w-full rounded-lg" />

          <h2 className="mt-3 text-xl">{video.title}</h2>

          <div className="flex gap-3 mt-2">
            <button onClick={like}>👍 {video.likes}</button>
            <button onClick={dislike}>👎 {video.dislikes}</button>
          </div>

          <div className="mt-5">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="bg-gray-800 p-2 w-full"
              placeholder="Add comment"
            />

            <button onClick={addComment} className="bg-blue-500 px-4 py-1 mt-2">
              Post
            </button>

            {comments.map((c) => (
              <p key={c._id} className="mt-2">
                {c.text}
              </p>
            ))}
          </div>
        </div>

        {/* SIDE VIDEOS */}
        <div className="w-80 hidden lg:block">
          <p className="text-gray-400">Suggested Videos</p>
        </div>

      </div>
    </div>
  );
};

export default VideoPage;