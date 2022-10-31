import styles from '../tasks.module.css';

function PopUp(props) {
  if (!props.show) {
    return null;
  }
  const onClosePopUp = () => {
    props.closePopUp();
  };
  const onConfirmPopUp = () => {
    props.onClosePopUp();
    props.closePopUp();
  };
  return (
    <div className={styles.popUp}>
      <div className={styles.popUpContent}>
        <div className={styles.popUpHeader}>
          <h3>{props.title}</h3>
        </div>
        <div>
          <p>{props.text}</p>
        </div>
        <button onClick={onConfirmPopUp} className={styles.deleteButton}>
          Delete
        </button>
        <button onClick={onClosePopUp} className={styles.cancelButton}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default PopUp;
