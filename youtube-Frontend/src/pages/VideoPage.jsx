import { useParams } from "react-router-dom";
import { videos } from "../data/videos";
import { useState } from "react";

// Video page component to display video details and comments
const VideoPage = () => {
  const { id } = useParams();

  const video = videos.find((v) => v._id === id);

  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  // Add comment
  const addComment = () => {
    setComments([...comments, comment]);
    setComment("");
  };

  return (
    <div className="bg-black text-white min-h-screen p-5">

      <h2 className="text-xl">{video.title}</h2>

      <video src={video.videoUrl} controls className="w-full mt-3" />

      <p className="mt-2">{video.description}</p>

      {/* Like/Dislike */}
      <div className="mt-3 flex gap-3">
        <button className="bg-gray-800 px-3 py-1 rounded">
          👍 {video.likes}
        </button>

        <button className="bg-gray-800 px-3 py-1 rounded">
          👎 {video.dislikes}
        </button>
      </div>

      {/* Comments */}
      <div className="mt-5">
        <h3>Comments</h3>

        <input
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="bg-gray-800 p-2 w-full"
          placeholder="Add comment"
        />

        {/* comment button */}
        <button onClick={addComment} className="mt-2 bg-blue-500 px-3 py-1">
          Post
        </button>

        {comments.map((c, i) => (
          <p key={i} className="mt-2">{c}</p>
        ))}
      </div>

    </div>
  );
};

export default VideoPage;