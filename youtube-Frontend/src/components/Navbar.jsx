import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar = ({ setSearch, toggleSidebar }) => {
  const [input, setInput] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="flex items-center justify-between px-5 py-3 bg-black text-white sticky top-0 z-50 border-b border-gray-800">

      {/* LEFT */}
      <div className="flex items-center gap-4">
        <button onClick={toggleSidebar}>☰</button>
        <h1 className="text-red-500 font-bold text-xl">YouTube</h1>
      </div>

      {/* SEARCH */}
      <div className="flex w-1/2">
        <input
          placeholder="Search"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-l-full"
        />
        <button
          onClick={() => setSearch(input)}
          className="px-5 bg-gray-800 rounded-r-full"
        >
          🔍
        </button>
      </div>

      {/* RIGHT */}
      <div>
        {user ? (
          <span className="bg-gray-800 px-3 py-1 rounded-full">
            {user.name}
          </span>
        ) : (
          <div className="flex gap-4">
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;