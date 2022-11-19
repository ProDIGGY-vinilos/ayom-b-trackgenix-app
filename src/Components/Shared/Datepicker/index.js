const DatePicker = ({ changeValue, inputValue, label, inputName, register, error = '' }) => {
  const HandleChange = (e) => {
    changeValue(e.target.value);
  };

  return (
    <div>
      <label>{label}</label>
      <input
        {...register(label)}
        name={inputName}
        type="date"
        value={inputValue}
        onChange={(e) => HandleChange(e)}
      ></input>
      {error && <p>{error}</p>}
    </div>
  );
};

export default DatePicker;
