import styles from 'Components/Shared/Select/select.module.css';

const Select = ({ selectedValue, options, changeValue, field, label, register, error = '' }) => {
  const handleChange = (e) => {
    changeValue(e.target.value);
  };

  if (!options || !options.length) {
    return (
      <select className={styles.select} disabled value={''} onChange={(e) => handleChange(e)}>
        <option className={styles.option} disabled value="">
          Loading data
        </option>
      </select>
    );
  }

  return (
    <div className={styles.selectContainer}>
      <label>{label}</label>
      <select
        {...register(field)}
        className={styles.select}
        value={selectedValue || ''}
        onChange={(e) => handleChange(e)}
      >
        <option className={styles.option} disabled value="">
          --Choose an option--
        </option>
        {options.map((item) => {
          return (
            <option className={styles.option} value={item._id} key={item._id}>
              {item[field]}
            </option>
          );
        })}
      </select>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Select;
