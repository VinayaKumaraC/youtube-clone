// sidebar with filter categories

function Sidebar({ setCategory }) {
  const categories = ["All", "Tech", "Music", "Gaming", "News", "Sports"];

  return (
    <div style={{ width: "200px", background: "#f1f1f1",height:"100vh" ,padding: "10px" }}>
      <h3>Filters</h3>

      {categories.map((cat) => (
        <p
          key={cat}
          style={{ cursor: "pointer" }}
          onClick={() => setCategory(cat)}
        >
          {cat}
        </p>
      ))}
    </div>
  );
}

export default Sidebar;