import styles from './admins.module.css';

function Modal(props) {
  if (!props.show) {
    return null;
  }
  const onCloseModal = () => {
    props.closeModal();
  };
  const onConfirmModal = () => {
    props.onCloseModal();
    props.closeModal();
  };
  return (
    <div className={styles.moduleContainer}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h3>{props.title}</h3>
        </div>
        <div className={styles.modalBody}>
          <p>{props.text}</p>
        </div>
        <button onClick={onCloseModal} className={styles.closeButton}>
          Cancel
        </button>
        <button onClick={onConfirmModal} className={styles.deleteButton}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default Modal;
