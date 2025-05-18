import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './postbox.css';

function Postbox({ show, onClose, onSubmit }) {
  const [postData, setPostData] = useState({
    content: '',
    deadlineDate: '',
    deadlineTime: '',
    destination: '',
    imageUrl: '',
  });

  const [username, setUsername] = useState('User');
  const fileInputRef = useRef(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData && userData.name) {
      setUsername(userData.name);
    }
  }, []);

  const firstLetter = username.charAt(0).toUpperCase();

  const handleChange = (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const isFormComplete =
      postData.content &&
      postData.deadlineDate &&
      postData.deadlineTime &&
      postData.destination;

    if (!isFormComplete) {
      alert('Please fill in all required fields.');
      return;
    }

    try {
      const formattedDate = new Date(postData.deadlineDate).toISOString().split('T')[0];

      const payload = {
        content: postData.content,
        deadline_date: formattedDate,
        deadline_time: postData.deadlineTime,
        destination: postData.destination,
        image_url: postData.imageUrl || null,
      };

      const response = await axios.post('http://127.0.0.1:8000/api/posts', payload);

      onSubmit(response.data);
      onClose();
      setPostData({
        content: '',
        deadlineDate: '',
        deadlineTime: '',
        destination: '',
        imageUrl: '',
      });
    } catch (error) {
      console.error('Failed to create post:', error);
      alert(
        'Failed to create post: ' +
          (error.response?.data?.message || error.message)
      );
    }
  };

  const handleFileClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPostData((prevData) => ({
          ...prevData,
          imageUrl: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  if (!show) return null;

  return (
    <div className="modal-overlay2">
      <div className="modal-box2">
        <header className="modal-header">
          <h3 className="Createpost">Create post</h3>
          <button onClick={onClose} className="close-btn">×</button>
        </header>

        <div className="modal-body">
          <div className="left-column">
            <div className="user-info">
              <div className="profile-circle">{firstLetter}</div>
              <p><strong>{username}</strong></p>
            </div>

            <div className="form-left">
              <div className="form-group">
                <label htmlFor="deadlineDate">Due Date</label>
                <input
                  type="date"
                  name="deadlineDate"
                  id="deadlineDate"
                  value={postData.deadlineDate}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="deadlineTime">Due Time</label>
                <input
                  type="time"
                  name="deadlineTime"
                  id="deadlineTime"
                  value={postData.deadlineTime}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="destination">Destination</label>
                <input
                  type="text"
                  name="destination"
                  id="destination"
                  placeholder="Enter destination"
                  value={postData.destination}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="textarea-right">
            <label htmlFor="content">Task Description</label>
            <textarea
              name="content"
              id="content"
              placeholder="What do you need?"
              value={postData.content}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="modal-footer">
          <div className="icons">
            <button type="button" onClick={handleFileClick}>📷</button>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
          </div>
          <button
            className="submit-btn"
            onClick={handleSubmit}
            disabled={
              !postData.content ||
              !postData.deadlineDate ||
              !postData.deadlineTime ||
              !postData.destination
            }
            style={{
              opacity:
                postData.content &&
                postData.deadlineDate &&
                postData.deadlineTime &&
                postData.destination
                  ? 1
                  : 0.5,
              cursor:
                postData.content &&
                postData.deadlineDate &&
                postData.deadlineTime &&
                postData.destination
                  ? 'pointer'
                  : 'not-allowed',
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default Postbox;
