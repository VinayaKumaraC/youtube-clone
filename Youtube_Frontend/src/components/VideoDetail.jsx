import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axios';

export default function VideoDetail() {
  const { id } = useParams(); // Get the video ID from the URL
  const [video, setVideo] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch video details and comments on component mount
  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        // 1. Fetch Video FIRST
        console.log(`Trying to fetch video ID: ${id}`);
        const video = await api.get(`/videos/${id}`);
        console.log("Video data received:", video.data);
        // Adjust based on how your backend wraps the single video response
        setVideo(video.data.data || video.data.video || video.data);

        // 2. Fetch Comments SECOND
        try {
          console.log(`Trying to fetch comments for video ID: ${id}`);
          const commentsRes = await api.get(`/comments/${id}`);
          console.log("Comments data received:", commentsRes.data);
          setComments(Array.isArray(commentsRes.data.data) ? commentsRes.data.data : (commentsRes.data.comments || []));
        } catch (commentError) {
          console.error("The Comments API crashed!", commentError.response?.data);
          // Don't crash the whole page if just comments fail
          setComments([]); 
        }

      } catch (videoError) {
        console.error("The Video API crashed!", videoError.response?.data);
      } finally {
        setLoading(false);
      }
    };
    fetchVideoData();
  }, [id]);

  // Handle Liking a video
  const handleLike = async () => {
    try {
      await api.put(`/videos/${id}/like`);
      // Optimistically update the UI
      setVideo(prev => ({ ...prev, likes: (prev.likes || 0) + 1 }));
    } catch (error) {
      console.error("Failed to like video", error);
      alert("You must be logged in to like a video.");
    }
  };

  // Handle Submitting a comment
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const payload = { videoId: id, text: newComment };
      const response = await api.post('/comments', payload);
      
      // Add the new comment to the top of the list
      setComments([response.data.comment || response.data, ...comments]);
      setNewComment(''); // Clear the input field
    } catch (error) {
      console.error("Failed to post comment", error);
      alert("You must be logged in to comment.");
    }
  };

  if (loading) return <p>Loading video...</p>;
  if (!video) return <p>Video not found.</p>;

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      
      {/* 1. THE REAL VIDEO PLAYER */}
      <div style={{ width: '100%', aspectRatio: '16/9', backgroundColor: '#000', borderRadius: '12px', overflow: 'hidden' }}>
        <video 
          src={video.videoUrl} 
          controls 
          autoPlay
          style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
        >
          Your browser does not support the video tag.
        </video>
      </div>

      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h2 style={{ margin: '0 0 10px 0' }}>{video.title}</h2>
          <p style={{ color: '#555', margin: 0 }}>{video.views || 0} views • {video.category}</p>
        </div>
        
        {/* 2. THE FIXED LIKE BUTTON */}
        <button 
          onClick={handleLike} 
          style={{ padding: '10px 20px', cursor: 'pointer', borderRadius: '20px', border: '1px solid #ccc', background: '#f0f0f0' }}
        >
          {/* Check if likes is an array and get its length, otherwise default to 0 */}
          👍 Like ({Array.isArray(video.likes) ? video.likes.length : (video.likes || 0)})
        </button>
      </div>
      
      <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f8f8f8', borderRadius: '12px' }}>
        <p style={{ margin: 0 }}>{video.description}</p>
      </div>

      <hr style={{ margin: '30px 0', border: 'none', borderTop: '1px solid #ccc' }} />
      {/* Comments Section */}
      <div style={{ marginTop: '30px' }}>
        <h3>Comments</h3>
        
        <form onSubmit={handleCommentSubmit} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <input 
            type="text" 
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a public comment..." 
            style={{ flex: 1, padding: '10px' }}
          />
          <button type="submit" style={{ padding: '10px 20px' }}>Comment</button>
        </form>

        <div>
          {comments.length === 0 ? <p>No comments yet.</p> : null}
          {comments.map((comment, index) => (
            <div key={comment._id || index} style={{ borderBottom: '1px solid #eee', padding: '10px 0' }}>
              <strong>{comment.author || 'User'}</strong>
              <p style={{ margin: '5px 0 0 0' }}>{comment.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}