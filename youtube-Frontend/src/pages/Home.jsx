import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  //store all videos
  const [videos, setVideos] = useState([]);

  // search input
  const [search, setSearch] = useState("");

  // Fetch videos when component loads
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        // Call backend API
        const res = await axios.get("http://localhost:9090/api/videos");
        setVideos(res.data);
      } catch (error) {
        console.log("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, []);

  // Filter videos based on search input
  const filtered = videos.filter((v) =>
    v.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex bg-black text-white min-h-screen">

      {/* Sidebar */}
      <div className="w-56 bg-black border-r border-gray-800 p-4 hidden md:block">
        <h2 className="text-lg font-semibold mb-4">Menu</h2>
        <ul className="space-y-3 text-gray-300">
          <li className="hover:text-white cursor-pointer">Home</li>
          <li className="hover:text-white cursor-pointer">Trending</li>
          <li className="hover:text-white cursor-pointer">Subscriptions</li>
        </ul>
      </div>

      {/* Main */}
      <div className="flex-1">

        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <h1 className="text-xl font-bold">🎥 YouTube Clone</h1>

          {/* Search */}
          <input
            type="text"
            placeholder="Search"
            className="w-1/2 px-4 py-2 rounded-full bg-gray-900 border border-gray-700 outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* Auth Links */}
          <div className="space-x-4">
            <Link to="/login" className="hover:text-red-500">Login</Link>
            <Link to="/register" className="hover:text-red-500">Register</Link>
          </div>
        </div>

        {/* Videos */}
        <div className="p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((video) => (
            <Link to={`/video/${video._id}`} key={video._id}>
              
              {/* Video Card */}
              <div className="hover:scale-105 transition cursor-pointer">
                
                {/* Thumbnail (fake preview box) */}
                <div className="bg-gray-800 h-40 rounded-lg"></div>

                {/* Info */}
                <div className="mt-2">
                  <h3 className="font-semibold text-sm">
                    {video.title}
                  </h3>
                  <p className="text-gray-400 text-xs">
                    👤 {video.user?.name}
                  </p>
                </div>

              </div>

            </Link>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Home;