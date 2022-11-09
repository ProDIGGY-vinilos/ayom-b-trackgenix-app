import styles from './modal.module.css';

const Modal = (props) => {
  if (!props.openModal) {
    return null;
  }

  const cancelButtonAction = () => {
    props.closeModal();
  };

  const deleteButtonAction = () => {
    props.deleteAction();
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
        <button onClick={cancelButtonAction} className={styles.closeButton}>
          Cancel
        </button>
        <button onClick={deleteButtonAction} className={styles.deleteButton}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default Modal;
