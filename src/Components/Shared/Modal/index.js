import styles from './modal.module.css';

function Modal({
  showModal,
  closeModal,
  title,
  message,
  confirmAction,
  declineButtonText = 'Cancel',
  confirmButtonText = 'Confirm'
}) {
  if (!showModal) {
    return null;
  }

  const declineButtonAction = () => {
    closeModal();
  };

  const confirmButtonAction = () => {
    confirmAction();
    closeModal();
  };

  return (
    <div className={styles.moduleContainer}>
      <div className={styles.modal}>
        <h3>{title}</h3>
        <div className={styles.modalBody}>
          <p>{message}</p>
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
}

export default Modal;
