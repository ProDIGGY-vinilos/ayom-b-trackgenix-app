import styles from './modal.module.css';

function Modal({ openModal, closeModal, id, title, warningText, deleteAction }) {
  if (!openModal) {
    return null;
  }

  const cancelAction = () => {
    closeModal();
  };

  const confirmAction = () => {
    deleteAction(id);
    closeModal();
  };
  return (
    <div className={styles.moduleContainer}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h3>{title}</h3>
        </div>
        <div className={styles.modalBody}>
          <p>{warningText}</p>
        </div>
        <div className={styles.btns}>
          <button onClick={cancelAction} className={styles.close}>
            Cancel
          </button>
          <button onClick={confirmAction} className={styles.delete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
