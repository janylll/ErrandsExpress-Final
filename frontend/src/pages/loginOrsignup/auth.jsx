import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';
import Lnavbar from '../../components/landingcoms/Lnavbar';
import SignInForm from './signIn';
import SignUpForm from './signUp';
import VerificationModal from './verification';
import bgImage from '../../assets/Background.png';

function Auth() {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => (document.body.style.overflow = 'auto');
  }, []);

  const [isSignUp, setIsSignUp] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [pendingUserData, setPendingUserData] = useState(null);
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate('/home');
  };

  return (
    <div className='Auth'>
      <Lnavbar />
      <div
        className="auth-wrapper"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="auth-box">
          <h1 className='title3'>{isSignUp ? 'Welcome!' : 'Welcome Back!'}</h1>
          <div className="toggle-auth-container">
            <span className="toggle-text">
              {isSignUp ? "Already have an account?" : "Don't have an account?"}
            </span>
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="toggle-auth-btn"
            >
              {isSignUp ? "Log In" : "Sign Up"}
            </button>
          </div>

          {isSignUp ? (
            <SignUpForm
              onSuccess={handleSuccess}
              openUploadModal={(data) => {
                setPendingUserData(data);
                setShowUploadModal(true);
              }}
            />
          ) : (
            <SignInForm onSuccess={handleSuccess} />
          )}
        </div>
      </div>

      {showUploadModal && (
        <VerificationModal
          closeModal={() => setShowUploadModal(false)}
          showSuccess={() => {
            setShowUploadModal(false);
            setShowSuccessModal(true);
          }}
          formData={pendingUserData}
        />
      )}

      {showSuccessModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <button className="close-btn" onClick={() => setShowSuccessModal(false)}>×</button>
            <h2>Uploaded Successfully!</h2>
            <p>Please wait for us to process your request.</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Auth;