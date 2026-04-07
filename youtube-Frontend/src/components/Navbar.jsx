import { Link } from "react-router-dom";

// Top navigation bar (YouTube style)
const Navbar = () => {
  return (
    <div className="flex items-center justify-between px-4 py-2 bg-black text-white sticky top-0">

      {/* Left section */}
      <div className="flex items-center gap-3">
        <span className="text-xl cursor-pointer">☰</span>
        <h1 className="text-red-500 font-bold">YouTube</h1>
      </div>

      {/* Search bar */}
      <div className="flex w-1/2">
        <input
          placeholder="Search"
          className="w-full px-4 py-1 bg-gray-900 border border-gray-700 rounded-l-full"
        />
        <button className="px-4 bg-gray-800 rounded-r-full">🔍</button>
      </div>

      {/* Auth buttons */}
      <div className="flex gap-3">
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>

    </div>
  );
};

export default Navbar;