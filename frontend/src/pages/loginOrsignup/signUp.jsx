import { useState } from 'react';
import axios from "axios";

function SignUpForm({ openUploadModal }) {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match. Please re-enter.");
      return;
    }

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/register", {
        fullname: formData.fullname,
        email: formData.email,
        password: formData.password,
      });

      console.log("Registration success:", response.data);
      setSuccess("Registration successful!");
      setError('');
      openUploadModal(); // Optional callback after registration
    } catch (err) {
      console.error("Registration error:", err);
      if (err.response?.data?.errors) {
        const errors = err.response.data.errors;
        setError(
          errors.fullname || errors.email || errors.password || "Registration failed."
        );
      } else {
        setError("Something went wrong.");
      }
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <div className="input-group">
        <label htmlFor="fullname">Full Name</label>
        <input
          type="text"
          id="fullname"
          name="fullname"
          placeholder="Full Name"
          value={formData.fullname}
          onChange={handleChange}
          required
        />
      </div>

      <div className="input-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="input-group">
        <label htmlFor="password">Password</label>
        <div className="password-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? '🙈' : '👁️'}
          </span>
        </div>
      </div>

      <div className="input-group">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <div className="password-wrapper">
          <input
            type={showConfirmPassword ? "text" : "password"}
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <span className="eye-icon" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
            {showConfirmPassword ? '🙈' : '👁️'}
          </span>
        </div>
      </div>

      {error && <p className="error-text" style={{ color: 'red' }}>{error}</p>}
      {success && <p className="success-text" style={{ color: 'green' }}>{success}</p>}

      <button type="submit">Sign Up</button>
    </form>
  );
}

export default SignUpForm;
