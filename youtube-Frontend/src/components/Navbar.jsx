import { Link } from "react-router-dom";

// Top navigation bar
const Navbar = () => {
  return (
    <div className="flex items-center justify-between px-4 py-2 bg-black text-white sticky top-0 z-50 border-b border-gray-800">

      {/* Left */}
      <div className="flex items-center gap-3">
        <span className="text-xl cursor-pointer">☰</span>
        <h1 className="text-red-500 font-bold text-lg">YouTube</h1>
      </div>

      {/* Search */}
      <div className="flex w-1/2">
        <input
          placeholder="Search"
          className="w-full px-4 py-1 bg-gray-900 border border-gray-700 rounded-l-full outline-none"
        />
        <button className="px-4 bg-gray-800 rounded-r-full">🔍</button>
      </div>

      {/* Auth */}
      <div className="flex gap-4">
        <Link to="/login" className="hover:text-red-500">Login</Link>
        <Link to="/register" className="hover:text-red-500">Register</Link>
      </div>

    </div>
  );
};

export default Navbar;