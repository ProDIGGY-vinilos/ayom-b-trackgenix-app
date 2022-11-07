import { Link } from 'react-router-dom';
import styles from './create-button.module.css';

function Button() {
  return (
    <Link to="/time-sheet-form">
      <button className={styles.createButton}>Create new Timesheet</button>
    </Link>
  );
}

export default Button;
