import React from 'react';

function Modal({ show, closeModal }) {
  if (!show) {
    return null;
  }
  return (
    <div>
      <h2>Modal</h2>
      <button onClick={closeModal}>Close</button>
    </div>
  );
}

export default Modal;
