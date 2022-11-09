import React from 'react';
import styles from './modal.module.css';

const Modal = ({
  showModal,
  closeModal,
  title,
  message,
  confirmAction,
  id,
  declineButtonText = 'Cancel',
  confirmButtonText = 'Confirm'
}) => {
  if (!showModal) {
    return null;
  }

  const declineButtonAction = () => {
    closeModal();
  };

  const confirmButtonAction = () => {
    confirmAction(id);
    closeModal();
  };

  return (
    <div className={styles.moduleContainer}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h3>{title}</h3>
        </div>
        <div className={styles.modalBody}>
          <p className={styles.modalText}>{message}</p>
        </div>
        <div className={styles.modalButtons}>
          <button onClick={declineButtonAction} className={styles.declineButton}>
            {declineButtonText}
          </button>
          <button onClick={confirmButtonAction} className={styles.confirmButton}>
            {confirmButtonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
