import styles from './create-button.module.css';

function Button() {
  return (
    <button className={styles.createButton}>
      <a href="/time-sheet-form">Create new Timesheet</a>
    </button>
  );
}

export default Button;
