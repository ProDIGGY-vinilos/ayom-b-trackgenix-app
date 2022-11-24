import styles from './textArea.module.css';

const TextAreaField = ({ label, name, placeholder, register, columns, rows, error = '' }) => {
  return (
    <div>
      {label && <label>{label}</label>}
      <textarea
        name={name}
        placeholder={placeholder}
        {...register(name)}
        cols={columns}
        rows={rows}
      />
      {error && <p className={styles.textColor}>{error}</p>}
    </div>
  );
};

export default TextAreaField;
