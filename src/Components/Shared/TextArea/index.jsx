import styles from './textArea.module.css';

const TextAreaField = ({ label, name, placeholder, register, columns, error = '' }) => {
  return (
    <div className={styles.container}>
      {label && <label>{label}</label>}
      <textarea
        className={styles.textArea}
        name={name}
        placeholder={placeholder}
        {...register(name)}
        cols={columns}
      />
      {error && <p className={styles.textColor}>{error}</p>}
    </div>
  );
};

export default TextAreaField;
