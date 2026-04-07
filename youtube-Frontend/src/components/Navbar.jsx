import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between p-4 bg-black border-b border-gray-800 text-white">

      {/* Logo */}
      <h1 className="text-xl font-bold text-red-500">
        YouTube Clone
      </h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search..."
        className="w-1/2 px-4 py-2 rounded-full bg-gray-900 border border-gray-700 outline-none"
      />

      {/* Links */}
      <div className="space-x-4">
        <Link to="/login" className="hover:text-red-500">Login</Link>
        <Link to="/register" className="hover:text-red-500">Register</Link>
      </div>
    </div>
  );
};

export default Navbar;