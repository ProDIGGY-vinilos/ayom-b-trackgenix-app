import styles from 'Components/Shared/Input/input.module.css';

const InputField = ({ id, name, type, placeholder, label, register, error = '', slimInput }) => {
  return (
    <div className={slimInput ? styles.formControlSlim : styles.formControl} key={id}>
      {label && <label>{label}</label>}
      <input {...register(name)} name={name} type={type} placeholder={placeholder} />
      {error && <p className={styles.textColor}>{error}</p>}
    </div>
  );
};

export default InputField;
