import styles from './confirmationmodal.module.css';

function Modal(props) {
  const handleClick = () => {
    props.onDelete(props.timeSheetId, props.timeSheets);
    props.closeModal();
  };

  if (!props.openModal) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <h2 className={styles.title}>Are you sure?</h2>
        <div className={styles.buttonsContainer}>
          <button className={styles.closebutton} onClick={props.closeModal}>
            No
          </button>
          <button className={styles.closebutton} onClick={() => handleClick()}>
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
