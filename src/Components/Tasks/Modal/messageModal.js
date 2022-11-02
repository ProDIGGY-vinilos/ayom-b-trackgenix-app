import styles from '../tasks.module.css';

function MessagePopUp(props) {
  if (!props.show) {
    return null;
  }
  const errorAction = () => {
    props.closePopUp();
  };
  switch (props.status) {
    case 'Error': {
      return (
        <div className={styles.popUp}>
          <div className={styles.popUpContent}>
            <div className={styles.popUpHeader}>
              <h3>Error</h3>
            </div>
            <div>
              <p>{props.text}</p>
            </div>
            <button onClick={errorAction} className={styles.cancelButton}>
              Accept
            </button>
          </div>
        </div>
      );
    }
    case 'POST': {
      return (
        <div className={styles.popUp}>
          <div className={styles.popUpContent}>
            <div className={styles.popUpHeader}>
              <h3>SUCCESS!</h3>
            </div>
            <div>
              <p>{props.text}</p>
            </div>
            <button onClick={errorAction} className={styles.cancelButton}>
              Add another one
            </button>
            <a className={styles.goBackButton} href="../tasks">
              Back to tasks
            </a>
          </div>
        </div>
      );
    }
    case 'PUT': {
      return (
        <div className={styles.popUp}>
          <div className={styles.popUpContent}>
            <div className={styles.popUpHeader}>
              <h3>SUCCESS!</h3>
            </div>
            <div>
              <p>{props.text}</p>
            </div>
            <a className={styles.goBackButton} href="../tasks">
              Back to tasks
            </a>
          </div>
        </div>
      );
    }
    default: {
      break;
    }
  }
}

export default MessagePopUp;
