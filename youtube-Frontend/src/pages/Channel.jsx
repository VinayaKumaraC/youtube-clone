import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const Channel = () => {
  const [videos, setVideos] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    videoUrl: "",
    thumbnail: "",
    category: "React",
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    const res = await axios.get("http://localhost:9090/api/videos");
    setVideos(res.data);
  };

  // CREATE VIDEO
  const createVideo = async () => {
    try {
      await axios.post(
        "http://localhost:9090/api/videos",
        form,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setForm({
        title: "",
        description: "",
        videoUrl: "",
        thumbnail: "",
        category: "React",
      });

      fetchVideos();
    } catch (err) {
      console.log(err);
    }
  };

  // DELETE VIDEO
  const deleteVideo = async (id) => {
    await axios.delete(
      `http://localhost:9090/api/videos/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchVideos();
  };

  return (
    <div className="bg-black text-white min-h-screen">

      <Navbar />

      <div className="max-w-5xl mx-auto p-5">

        {/* CREATE VIDEO */}
        <div className="bg-gray-900 p-4 rounded mb-6">
          <h2 className="text-lg mb-3">Upload Video</h2>

          <input
            placeholder="Title"
            className="w-full mb-2 p-2 bg-gray-800"
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
          />

          <input
            placeholder="Description"
            className="w-full mb-2 p-2 bg-gray-800"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

          <input
            placeholder="Video URL"
            className="w-full mb-2 p-2 bg-gray-800"
            value={form.videoUrl}
            onChange={(e) =>
              setForm({ ...form, videoUrl: e.target.value })
            }
          />

          <input
            placeholder="Thumbnail URL"
            className="w-full mb-2 p-2 bg-gray-800"
            value={form.thumbnail}
            onChange={(e) =>
              setForm({ ...form, thumbnail: e.target.value })
            }
          />

          <select
            className="w-full mb-2 p-2 bg-gray-800"
            value={form.category}
            onChange={(e) =>
              setForm({ ...form, category: e.target.value })
            }
          >
            <option>React</option>
            <option>Music</option>
            <option>Gaming</option>
            <option>News</option>
            <option>Programming</option>
          </select>

          <button
            onClick={createVideo}
            className="bg-red-500 px-4 py-2 rounded"
          >
            Upload
          </button>
        </div>

        {/* VIDEO LIST */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {videos.map((v) => (
            <div key={v._id} className="bg-gray-900 p-3 rounded">

              <img src={v.thumbnail} className="rounded mb-2" />

              <p>{v.title}</p>

              <button
                onClick={() => deleteVideo(v._id)}
                className="text-red-400 text-sm mt-2"
              >
                Delete
              </button>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Channel;