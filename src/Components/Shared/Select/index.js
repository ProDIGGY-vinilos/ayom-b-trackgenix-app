const Select = ({ selectedValue, options, changeValue, field, label }) => {
  const handleChange = (e) => {
    changeValue(e.target.value);
  };

  if (!options || !options.length) {
    return (
      <select disabled value={''} onChange={(e) => handleChange(e)}>
        <option disabled value="">
          Loading data
        </option>
      </select>
    );
  }

  return (
    <>
      <label>{label}</label>
      <select value={selectedValue || ''} onChange={(e) => handleChange(e)}>
        <option disabled value="">
          --Choose an option--
        </option>
        {options.map((item) => {
          return (
            <option value={item._id} key={item._id}>
              {item[field]}
            </option>
          );
        })}
      </select>
    </>
  );
};

export default Select;
