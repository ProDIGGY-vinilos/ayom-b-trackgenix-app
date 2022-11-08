import React from 'react';
import styles from './modal.module.css';

function Modal({ title, text, show, closeModal, onDelete, onAddUpdate, id }) {
  if (!show) {
    return null;
  }

  const onCloseModal = () => {
    closeModal();
  };

  const onConfirmDelete = () => {
    onDelete(id);
    closeModal();
  };

  const onConfirmAddUpdate = () => {
    onAddUpdate();
    closeModal();
  };

  return (
    <div className={styles.moduleContainer}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h3>{title}</h3>
        </div>
        <div className={styles.modalBody}>
          <p>{text}</p>
        </div>
        <button onClick={onCloseModal} className={styles.closeButton}>
          Cancel
        </button>
        {onDelete && (
          <button onClick={onConfirmDelete} className={styles.deleteButton}>
            Delete
          </button>
        )}
        {onAddUpdate && (
          <button onClick={onConfirmAddUpdate} className={styles.deleteButton}>
            Submit
          </button>
        )}
      </div>
    </div>
  );
}

export default Modal;
