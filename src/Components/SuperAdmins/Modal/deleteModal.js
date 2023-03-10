import styles from './modal.module.css';

const Modal = (props) => {
  if (!props.openModal) {
    return null;
  }

  const cancelBtn = () => {
    props.closeModal();
  };

  const confirmBtn = () => {
    props.deleteAction(props.id);
    props.closeModal();
  };

  return (
    <div className={styles.moduleContainer}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h3>{props.title}</h3>
          <button onClick={cancelBtn} className={styles.cancelBtnX}>
            X
          </button>
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
