import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar = ({ setSearch, toggleSidebar }) => {
  const [input, setInput] = useState("");

  let user = null;
  try {
    const stored = localStorage.getItem("user");
    if (stored && stored !== "undefined") {
      user = JSON.parse(stored);
    }
  } catch {}

  return (
    <div className="flex items-center justify-between px-4 py-2 bg-[#0f0f0f] text-white border-b border-gray-800">

      <div className="flex items-center gap-4">
        <button onClick={toggleSidebar}>☰</button>
        <h1 className="text-red-500 font-bold">YouTube</h1>
      </div>

      <div className="flex w-1/2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full px-4 py-2 bg-black border border-gray-700 rounded-l-full"
          placeholder="Search"
        />
        <button
          onClick={() => setSearch(input)}
          className="px-5 bg-gray-800 rounded-r-full"
        >
          🔍
        </button>
      </div>

      <div>
        {user ? (
          <span>{user.name}</span>
        ) : (
          <div className="flex gap-3">
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>
        )}
      </div>

    </div>
  );
};

export default Navbar;