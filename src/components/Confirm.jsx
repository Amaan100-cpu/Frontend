import React from 'react';
import './Confirm.css';

const DeleteModal = ({ isPopupOpen, onCancel, onConfirm,smallMsg,largeMsg }) => {
  if (!isPopupOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Confirm {largeMsg}</h3>
        <p>Are you sure you want to {smallMsg} this product?</p>
        <div className="modal-buttons">
          <button className="cancel-btn" onClick={onCancel}>Cancel</button>
          <button className="confirm-btn" onClick={onConfirm}>{largeMsg}</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
