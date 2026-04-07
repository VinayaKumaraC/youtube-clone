// Sidebar component
const Sidebar = () => {
  // Render a vertical sidebar with navigation links
  return (
    <div className="w-56 bg-black text-white p-4 hidden md:block border-r border-gray-800">

      <div className="space-y-3">

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