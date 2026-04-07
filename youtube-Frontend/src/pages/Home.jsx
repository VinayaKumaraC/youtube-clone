import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Filters from "../components/Filters";
import VideoCard from "../components/VideoCard";
import { videos } from "../data/videos";
import { useState } from "react";

// Home page component to display video list with filters
const Home = () => {
  const [filter, setFilter] = useState("All");

  // Filter videos based on category
  const filteredVideos =
    filter === "All"
      ? videos
      : videos.filter((v) => v.category === filter);

  return (
    <div className="bg-black min-h-screen">

      <Navbar />

      <div className="flex">

        <Sidebar />

        {/* Main content area with filters and video grid */}
        <div className="flex-1">

          <Filters setFilter={setFilter} />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-5">

            {filteredVideos.map((video) => (
              <VideoCard key={video._id} video={video} />
            ))}

          </div>

        </div>

      </div>
    </div>
  );
};

export default Home;