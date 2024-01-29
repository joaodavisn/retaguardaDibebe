import React from 'react';

const Modal = ({ children, onClose }) => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',  // Semi-transparent black
    }}>
      <div style={{
        position: 'relative',
        padding: '20px',
        backgroundColor: 'white',
        borderRadius: '10px',
        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',  // Shadow effect
      }}>
        {children}
        <button onClick={onClose} style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
        }}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
