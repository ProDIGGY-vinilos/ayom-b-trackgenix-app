const DatePicker = ({ label, inputName, register, error = '' }) => {
  return (
    <div>
      <label>{label}</label>
      <input {...register(label)} name={inputName} type="date"></input>
      {error && <p>{error}</p>}
    </div>
  );
};

export default DatePicker;
