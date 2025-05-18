import React, { useState } from 'react';
import Lnavbar from '../../components/landingcoms/Lnavbar';
import Lfooter from '../../components/landingcoms/Lfooter';
import './feedbackPage.css';

function FeedbackPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [feedbackList, setFeedbackList] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newFeedback = {
      id: Date.now(),
      ...formData,
    };
    setFeedbackList([newFeedback, ...feedbackList]);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="page-container">
      <Lnavbar />
      <main className="feedback-center">
        <section className="feedback-grid">
          <div className="form-section">
            <h2 className="feedback-title">We’d Love Your Feedback</h2>
            <form className="feedback-form" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <textarea
                name="message"
                placeholder="Your Message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
              />
              <button type="submit">Send Feedback</button>
            </form>
          </div>

          <div className="list-section">
            <h2 className="feedback-title">Latest Feedback</h2>
            {feedbackList.length === 0 ? (
              <p className="no-feedback">No feedback yet.</p>
            ) : (
              <ul className="feedback-list">
                {feedbackList.slice(0, 3).map((item) => (
                  <li key={item.id} className="feedback-item">
                    <h4>{item.name}</h4>
                    <p>{item.message}</p>
                    <span className="email">{item.email}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </main>
      <Lfooter />
    </div>
  );
}

export default FeedbackPage;
