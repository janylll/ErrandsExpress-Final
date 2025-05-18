import { useEffect, useState } from 'react';
import axios from 'axios';
import './runnerpostcard.css';

function RunnerPost() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/posts');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const handleAcceptTask = async (postId) => {
    try {
      await axios.post(`http://127.0.0.1:8000/api/posts/${postId}/accept`);
      setPosts(posts.map(post => post.id === postId ? { ...post, status: 'accepted', in_inbox: true } : post));
    } catch (error) {
      console.error('Error accepting task:', error);
    }
  };

  const handleCompleteTask = async (postId) => {
    try {
      await axios.post(`http://127.0.0.1:8000/api/posts/${postId}/complete`);
      setPosts(posts.map(post => post.id === postId ? { ...post, status: 'runner_completed' } : post));
    } catch (error) {
      console.error('Error completing task:', error);
    }
  };

  const availablePosts = posts.filter(post => !post.in_inbox);

  return (
    <div className="runner-post-panel">
      <div className="runner-feed">
        {availablePosts.map((post) => {
          const dueTimeParts = post.deadline_time?.split(":") || [];
          const dueDateTime = new Date(post.deadline_date);
          if (dueTimeParts.length === 2) {
            dueDateTime.setHours(dueTimeParts[0], dueTimeParts[1]);
          }

          const formattedDueTime = dueDateTime.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          });

          const formattedDueDate = new Date(post.deadline_date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          });

          const creatorName = post.user?.name || 'User';
          const firstLetter = creatorName.charAt(0).toUpperCase();

          return (
            <div key={post.id} className="post-card">
              <div className="post-header">
                <div className="Newfeedprofile-circle">{firstLetter}</div>
                <div className="name">
                  <strong>{creatorName}</strong>
                  <p className="created-at">{new Date(post.created_at).toLocaleString()}</p>
                </div>
              </div>

              {post.image_url && (
                <img src={post.image_url} alt="Uploaded" className="post-image" />
              )}

              <p className="post-content">{post.content}</p>

              <footer className="footerpost">
                <div className="due-info">
                  <p><strong>Destination:</strong> {post.destination}</p>
                  <p><strong>Due Time:</strong> {formattedDueTime}</p>
                  <p><strong>Due Date:</strong> {formattedDueDate}</p>
                </div>
              </footer>

              {post.status === 'pending' && (
                <button className="accept-btn" onClick={() => handleAcceptTask(post.id)}>
                  Accept Task
                </button>
              )}

              {post.status === 'accepted' && (
                <button className="complete-btn" onClick={() => handleCompleteTask(post.id)}>
                  Complete Task
                </button>
              )}

              {post.status === 'runner_completed' && (
                <button className="waiting-btn" disabled>
                  Waiting for Confirmation
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RunnerPost;
