import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

export default function VideoUpload() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    thumbnailUrl: '',
    videoUrl: '' // Assuming your backend expects a URL
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // POST to /api/videos
      const response = await api.post('/videos', formData);
      alert('Video uploaded successfully!');
      
      // Redirect back to the home page to see the new video
      navigate('/');
    } catch (error) {
      console.error("Upload error", error);
      alert(error.response?.data?.message || 'Failed to upload video.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ maxWidth: '500px', margin: '40px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Upload a Video</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        
        <input 
          type="text" 
          name="title" 
          placeholder="Video Title" 
          value={formData.title}
          onChange={handleChange} 
          required 
          style={{ padding: '10px' }}
        />
        
        <textarea 
          name="description" 
          placeholder="Description" 
          value={formData.description}
          onChange={handleChange} 
          rows="4"
          style={{ padding: '10px' }}
        />
        
        <input 
          type="text" 
          name="thumbnailUrl" 
          placeholder="Thumbnail Image URL" 
          value={formData.thumbnailUrl}
          onChange={handleChange} 
          required 
          style={{ padding: '10px' }}
        />

        <input 
          type="text" 
          name="videoUrl" 
          placeholder="Video URL (e.g., AWS S3 link or external link)" 
          value={formData.videoUrl}
          onChange={handleChange} 
          required 
          style={{ padding: '10px' }}
        />

        <button type="submit" disabled={loading} style={{ padding: '10px', backgroundColor: '#cc0000', color: 'white', border: 'none', cursor: 'pointer' }}>
          {loading ? 'Uploading...' : 'Publish Video'}
        </button>
      </form>
    </div>
  );
}