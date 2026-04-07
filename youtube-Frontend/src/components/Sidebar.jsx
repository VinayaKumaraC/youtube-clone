// SIDEBAR COMPONENT
const Sidebar = () => {
  return (
    <div className="w-56 bg-black text-white p-4 hidden md:block">

      <div className="space-y-4">

        {/* Sidebar links */}
        <p className="cursor-pointer hover:bg-gray-800 p-2 rounded">🏠 Home</p>
        <p className="cursor-pointer hover:bg-gray-800 p-2 rounded">🔥 Trending</p>
        <p className="cursor-pointer hover:bg-gray-800 p-2 rounded">📺 Subscriptions</p>
        <p className="cursor-pointer hover:bg-gray-800 p-2 rounded">📚 Library</p>
        <p className="cursor-pointer hover:bg-gray-800 p-2 rounded">🕒 History</p>

      </div>

    </div>
  );
};

export default Sidebar;