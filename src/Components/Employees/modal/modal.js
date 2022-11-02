import styles from './modal.module.css';

function Modal(props) {
  if (!props.openModal) {
    return null;
  }

  const cancelAction = () => {
    props.closeModal();
  };

  const deleteAction = () => {
    props.deleteAction(props.id);
    props.closeModal();
  };
  return (
    <div className={styles.moduleContainer}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h3>{props.title}</h3>
        </div>
        <div className={styles.modalBody}>
          <p>{props.warningText}</p>
        </div>
        <div className={styles.btns}>
          <button onClick={cancelAction} className={styles.close}>
            Cancel
          </button>
          <button onClick={deleteAction} className={styles.delete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
