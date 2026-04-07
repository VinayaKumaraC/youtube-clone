// Sidebar menu (static as per requirement)
const Sidebar = () => {
  return (
    <div className="w-56 bg-black text-white h-screen p-4 hidden md:block">

      <p className="mb-3 hover:bg-gray-800 p-2 rounded">🏠 Home</p>
      <p className="mb-3 hover:bg-gray-800 p-2 rounded">🔥 Trending</p>
      <p className="mb-3 hover:bg-gray-800 p-2 rounded">📺 Subscriptions</p>

    </div>
  );
};

export default Sidebar;