import { Link } from 'react-router-dom';
import styles from './employees.module.css';

const button = ({ color, text, onClick, href }) => {
  return (
    <>
      <Link to={href}>
        <button onClick={onClick} style={{ backgroundColor: color }} className={styles.btn}>
          {text}
        </button>
      </Link>
    </>
  );
};

export default button;
