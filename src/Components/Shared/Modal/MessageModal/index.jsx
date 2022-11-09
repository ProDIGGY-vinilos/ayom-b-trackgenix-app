import React from 'react';
import styles from './modal.module.css';

const MessageModal = ({ type, isOpen, message, handleClose }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.modalContainer}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h3 className={styles.modalTitle}>{type}</h3>
          <button onClick={handleClose} className={styles.closeButton}>
            X
          </button>
        </div>
        <p className={styles.modalText}>{message}</p>
        <button onClick={handleClose} className={styles.acceptButton}>
          {'Accept'}
        </button>
      </div>
    </div>
  );
};

export default MessageModal;
