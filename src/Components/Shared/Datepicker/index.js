const DatePicker = ({ changeValue, inputValue, label, inputName }) => {
  const HandleChange = (e) => {
    changeValue(e.target.value);
  };

  return (
    <>
      <label>{label}</label>
      <input
        name={inputName}
        type="date"
        value={inputValue}
        onChange={(e) => HandleChange(e)}
      ></input>
    </>
  );
};

export default DatePicker;
