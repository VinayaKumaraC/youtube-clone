import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Auth from './components/Auth';
import VideoList from './components/VideoList';
import VideoDetail from './components/VideoDetail';
import VideoUpload from './components/VideoUpload'; // 1. Import the new component

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <Router>
      <nav style={{ padding: '10px 20px', background: '#f8f8f8', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
          <h1>▶️ YouTube Clone</h1>
        </Link>
        
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <Link to="/">Home</Link>
          
          {/* 2. Show Upload and Logout only if the user has a token */}
          {token ? (
            <>
              <Link to="/upload" style={{ fontWeight: 'bold', color: '#cc0000' }}>+ Upload</Link>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <Link to="/auth">Login</Link>
          )}
        </div>
      </nav>

      <div style={{ padding: '20px' }}>
        <Routes>
          <Route path="/" element={<VideoList />} />
          <Route path="/auth" element={<Auth setToken={setToken} />} />
          <Route path="/video/:id" element={<VideoDetail />} />
          
          {/* 3. Add the Upload Route (Protected) */}
          <Route 
            path="/upload" 
            element={token ? <VideoUpload /> : <Navigate to="/auth" />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;