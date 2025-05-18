import React, { useEffect, useState } from 'react';
import './postcard.css';

function PostCard({ post }) {
  const dueDateObj = new Date(`${post.deadline_date}T${post.deadline_time}`);

  const formattedDueTime = dueDateObj.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  const formattedDueDate = dueDateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const createdAt = new Date(post.created_at);

  const [username, setUsername] = useState('User');

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData && userData.name) {
      setUsername(userData.name);
    }
  }, []);

  const firstLetter = username.charAt(0).toUpperCase();

  return (
    <div className="post-card">
      <div className="post-header">
        <div className="Newfeedprofile-circle">{firstLetter}</div>
        <div className="name">
          <strong>{username}</strong>
          <p className="created-at">
            Posted on {createdAt.toLocaleDateString()} at {createdAt.toLocaleTimeString()}
          </p>
        </div>
      </div>

      {post.image_url && (
        <img src={post.image_url} alt="Uploaded" className="post-image" />
      )}

      <p className="post-content">{post.content}</p>

      <footer className="footerpost">
        <div className="due-info">
          <p>
            <strong>Destination:</strong> {post.destination}
          </p>
          <p>
            <strong>Due Time:</strong> {formattedDueTime}
          </p>
          <p>
            <strong>Due Date:</strong> {formattedDueDate}
          </p>
        </div>

        <div className="post-footer">
          <button className="status-btn" disabled>
            {post.status}
          </button>
        </div>
      </footer>
    </div>
  );
}

export default PostCard;
