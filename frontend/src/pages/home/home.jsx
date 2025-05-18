import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Postbox from './postbox';
import PostCard from './postcard';
import { useOutletContext } from 'react-router-dom';
import './home.css';

function Home() {
  const [showModal, setShowModal] = useState(false);
  const { posts, setPosts } = useOutletContext();

  // Fetch posts on first render
  useEffect(() => {
    fetchPostsFromBackend();
  }, []);

  const fetchPostsFromBackend = async () => {
    try {
      const res = await axios.get('http://127.0.0.1:8000/api/posts');
      setPosts(res.data.reverse()); // Optional: reverse to show newest first
    } catch (err) {
      console.error('Error fetching posts:', err);
    }
  };

  const handlePost = async (newPost) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/posts', {
        content: newPost.content,
        deadline_date: newPost.deadlineDate,
        deadline_time: newPost.deadlineTime,
        destination: newPost.destination,
        image_url: newPost.imageUrl || null,
      });

      setPosts([response.data, ...posts]);
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const handleCancelPost = async (index) => {
    // Optionally send a delete request to backend here
    setPosts(posts.filter((_, idx) => idx !== index));
  };

  const handleConfirmComplete = (indexToConfirm) => {
    setPosts(posts.map((post, idx) =>
      idx === indexToConfirm ? { ...post, status: 'completed' } : post
    ));
  };

  return (
    <div className="Pages">
      <h2 className='title4'>Your Errands</h2>
      <p className='tagline3'>Check your pending errands or create one.</p>

      <input
        className="makeerrandstext"
        placeholder="Need a quick errand?"
        onFocus={() => setShowModal(true)}
        readOnly
      />

      <Postbox
        show={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handlePost} // changed from onSubmit
      />

      <div className="feed-wrap">
        {posts.map((post, index) => (
          <PostCard
            key={post.id || index}
            post={post}
            index={index}
            onCancel={handleCancelPost}
            onConfirmComplete={handleConfirmComplete}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
