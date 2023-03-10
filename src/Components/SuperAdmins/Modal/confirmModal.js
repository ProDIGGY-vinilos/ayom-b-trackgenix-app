import styles from './modal.module.css';

const Modal = (props) => {
  if (!props.openModal) {
    return null;
  }

  const cancelBtn = () => {
    props.closeModal();
  };

  const confirmBtn = () => {
    props.closeModal();
    document.location.href = '/super-admins';
  };

  return (
    <div className={styles.moduleContainer}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h3>{props.title}</h3>
          <a onClick={cancelBtn} className={styles.cancelBtnX}>
            X
          </a>
        </div>
        <div className={styles.entireBody}>
          <div className={styles.modalBody}>
            <p>{props.warningText}</p>
          </div>
          <div className={styles.buttons}>
            <button onClick={cancelBtn} className={styles.cancelBtn}>
              Cancel
            </button>
            <button onClick={confirmBtn} className={styles.confirmBtn}>
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
