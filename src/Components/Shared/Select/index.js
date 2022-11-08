import { useState } from 'react';

function Select({ defaultValue, data, changeValue, field, label }) {
  const [selected, setSelected] = useState('');

  const handleChange = (e) => {
    changeValue(e.target.value);
    setSelected();
  };
  if (defaultValue) {
    return (
      <>
        <label>{label}</label>
        <select onChange={(e) => handleChange(e)}>
          <option disabled={true} value="">
            {defaultValue}
          </option>
          {data.map((item) => {
            return (
              <option value={item._id} key={item._id}>
                {item[field]}
              </option>
            );
          })}
        </select>
      </>
    );
  }
  return (
    <>
      <label>{label}</label>
      <select value={selected} onChange={(e) => handleChange(e)}>
        <option disabled={true} value="">
          --Choose an option--
        </option>
        {data.map((item) => {
          return (
            <option value={item._id} key={item._id}>
              {item[field]}
            </option>
          );
        })}
      </select>
    </>
  );
}

export default Select;
