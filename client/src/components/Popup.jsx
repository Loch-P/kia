import React from 'react';

const Popup = ({ url, onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="close-button" onClick={onClose}>
          Close
        </button>
        <iframe src={url} title="Popup" />
      </div>
    </div>
  );
};

export default Popup;
