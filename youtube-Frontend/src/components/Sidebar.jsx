// Sidebar component with navigation links
const Sidebar = () => {
  return (
    <div className="w-56 bg-black text-white h-screen p-3 hidden md:block">
      <p className="mb-3">🏠 Home</p>
      <p className="mb-3">🔥 Trending</p>
      <p className="mb-3">📺 Subscriptions</p>
    </div>
  );
};

export default Sidebar;