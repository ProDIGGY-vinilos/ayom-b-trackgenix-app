import React from 'react';
import { Link } from 'react-router-dom';
import styles from './shared.modal.module.css';

const Modal = ({ type, isOpen, message, handleClose, goBack }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h3>{type == 'Error' ? 'Error' : 'Success'}</h3>
          <button onClick={handleClose} className={styles.closeButton}>
            X
          </button>
        </div>
        <p>{message}</p>
        {type == 'Error' ? (
          <button onClick={handleClose} className={styles.acceptButton}>
            {'Accept'}
          </button>
        ) : (
          <Link to={goBack}>
            {
              <button onClick={handleClose} className={styles.returnButton}>
                {type !== 'DELETE' ? 'Go back' : 'Accept'}
              </button>
            }
          </Link>
        )}
        {type == 'POST' ? (
          <button onClick={handleClose} className={styles.acceptButton}>
            {'Add another one'}
          </button>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default Modal;
