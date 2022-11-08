const DatePicker = ({ changeValue, inputValue, label }) => {
  const HandleChange = (e) => {
    changeValue(e.target.value);
  };

  return (
    <>
      <label>{label}</label>
      <input type="date" value={inputValue} onChange={(e) => HandleChange(e)}></input>
    </>
  );
};

export default DatePicker;
