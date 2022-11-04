import styles from './employees.module.css';
const button = ({ color, text, onClick, href }) => {
  return (
    <>
      <button onClick={onClick} style={{ backgroundColor: color }} className={styles.btn}>
        <a href={href}>{text}</a>
      </button>
    </>
  );
};

export default button;
