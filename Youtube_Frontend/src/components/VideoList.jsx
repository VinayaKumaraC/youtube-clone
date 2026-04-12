import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // 1. Don't forget this import!
import api from '../api/axios';

export default function VideoList() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await api.get('/videos');
        setVideos(response.data.data); 
      } catch (error) {
        console.error("Failed to fetch videos", error);
      }
    };
    fetchVideos();
  }, []);

  return (
    <div className="video-grid" style={{ padding: '20px' }}>
      <h2 style={{ marginBottom: '20px' }}>Recommended Videos</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {videos?.map?.((video) => (
          /* 2. Wrap the card in a Link to enable navigation */
          <Link 
            to={`/video/${video._id || video.id}`} 
            key={video._id || video.id} 
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <div style={{ 
              width: '300px', 
              cursor: 'pointer',
              transition: 'transform 0.2s' 
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              {/* 3. Add the Thumbnail Image */}
              <img 
                src={video.thumbnailUrl || 'https://miro.medium.com/v2/resize:fit:1400/0*hZK1xVsaAFVjlEyB.jpeg'} 
                alt={video.title} 
                style={{ width: '100%', borderRadius: '12px', aspectRatio: '16/9', objectFit: 'cover' }} 
              />
              
              <div style={{ padding: '10px 0' }}>
                <h3 style={{ margin: '0 0 5px 0', fontSize: '16px', lineHeight: '1.4' }}>
                  {video.title}
                </h3>
                <p style={{ margin: '0', fontSize: '14px', color: '#606060' }}>
                  {video.views || 0} views
                </p>
              </div>
            </div>
          </Link>
        )) || <p>No videos found.</p>}
      </div>
    </div>
  );
}