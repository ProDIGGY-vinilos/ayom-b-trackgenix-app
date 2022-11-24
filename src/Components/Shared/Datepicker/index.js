import styles from 'Components/Shared/Datepicker/datePicker.module.css';

const DatePicker = ({ label, inputName, register, error = '' }) => {
  return (
    <div>
      <label>{label}</label>
      <input {...register(inputName)} name={inputName} type="date"></input>
      {error && <p className={styles.textColor}>{error}</p>}
    </div>
  );
};

export default DatePicker;
