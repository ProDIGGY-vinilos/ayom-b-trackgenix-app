import styles from './employees.module.css';
const button = ({ color, text, onClick }) => {
  return (
    <button onClick={onClick} style={{ backgroundColor: color }} className={styles.btn}>
      {text}
    </button>
  );
};

export default button;
