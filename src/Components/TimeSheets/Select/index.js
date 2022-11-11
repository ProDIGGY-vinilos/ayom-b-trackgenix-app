import { useState } from 'react';

const Select = ({ defaultValue, switcher, data, setId, field }) => {
  const [selected, setSelected] = useState('');

  const handleChange = (e) => {
    setId(e.target.value);
    setSelected();
  };
  if (switcher) {
    return (
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
    );
  }
  return (
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
  );
};

export default Select;
