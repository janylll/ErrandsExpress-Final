import { useState } from 'react';

function VerificationModal({ closeModal, showSuccess }) {
  const [uploads, setUploads] = useState({ idPic: null, facePic: null });
  const [uploadError, setUploadError] = useState('');

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setUploads(prev => ({
      ...prev,
      [name]: files[0]
    }));
  };

  const handleUploadSubmit = () => {
    if (!uploads.idPic || !uploads.facePic) {
      setUploadError('Please upload both ID and Face pictures.');
      return;
    }
    setUploadError('');
    showSuccess();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <button className="close-btn" onClick={closeModal}>×</button>
        <h2>Upload Verification Photos</h2>
        <p>Please upload a photo of your ID and a clear photo of your face.</p>

        <div className="upload-group">
          <label>ID Picture</label>
          <input type="file" name="idPic" accept="image/*" onChange={handleFileChange} />
        </div>

        <div className="upload-group">
          <label>Face Picture</label>
          <input type="file" name="facePic" accept="image/*" onChange={handleFileChange} />
        </div>

        {uploadError && <p className="upload-error">{uploadError}</p>}

        <button type="button" className="submit-upload" onClick={handleUploadSubmit}>Submit</button>
      </div>
    </div>
  );
}

export default VerificationModal;
