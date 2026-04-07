const Sidebar = ({ open }) => {
  if (!open) return null;

  return (
    <div className="w-60 bg-black text-white p-4 border-r border-gray-800 fixed h-full z-40">

      <div className="space-y-3">
        <p className="hover:bg-gray-800 p-2 rounded">🏠 Home</p>
        <p className="hover:bg-gray-800 p-2 rounded">🔥 Trending</p>
        <p className="hover:bg-gray-800 p-2 rounded">📺 Subscriptions</p>
        <p className="hover:bg-gray-800 p-2 rounded">📚 Library</p>
      </div>

    </div>
  );
};

export default Sidebar;