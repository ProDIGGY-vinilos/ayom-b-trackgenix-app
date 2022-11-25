import styles from 'Components/Shared/Select/select.module.css';

const Select = ({ options, field, name, label, register, error = '' }) => {
  if (!options || !options.length) {
    return (
      <select className={styles.select} disabled value={''}>
        <option className={styles.option} disabled value="">
          Loading data
        </option>
      </select>
    );
  }

  return (
    <div className={styles.selectContainer}>
      <label>{label}</label>
      <select {...register(name)} className={styles.select}>
        {options.map((item) => {
          return (
            <option className={styles.option} value={item._id} key={item._id}>
              {item[field]}
            </option>
          );
        })}
      </select>
      {error && <p className={styles.textColor}>{error}</p>}
    </div>
  );
};

export default Select;
