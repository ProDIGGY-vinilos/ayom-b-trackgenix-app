import styles from '../Input/input.module.css';

const InputField = ({
  id,
  name,
  value,
  type,
  placeholder,
  onChange,
  label,
  register,
  error = ''
}) => {
  return (
    <div key={id}>
      {label && <label>{label}</label>}
      <input
        {...register(name)}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e)}
      />
      {error && <p className={styles.textColor}>{error}</p>}
    </div>
  );
};

export default InputField;
