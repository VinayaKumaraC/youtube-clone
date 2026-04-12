// header with search + login state

import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

function Header({ setSearch }) {
  const { user, logout } = useContext(AuthContext);
  const [text, setText] = useState("");

  const handleSearch = () => {
    setSearch(text);
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "10px", background: "#eee" }}>
      <h2>YouTube Clone</h2>

      {/* search bar */}
      <div>
        <input
          placeholder="Search"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {/* auth section */}
      <div>
        {user ? (
          <>
            <span>{user.username}</span>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;