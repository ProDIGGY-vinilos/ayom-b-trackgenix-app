import { useState } from 'react';

function Select({ defaultValue, switcher, Data, setId, field }) {
  const [selected, setSelected] = useState('');

  const handleChange = (e) => {
    setId(e.target.value);
    setSelected();
  };
  switch (switcher) {
    case false:
      return (
        <select value={selected} onChange={(e) => handleChange(e)}>
          <option disabled={true} value="">
            --Choose and option--
          </option>
          {Data.map((Item) => {
            return (
              <option value={Item._id} key={Item._id}>
                {Item[field]}
              </option>
            );
          })}
        </select>
      );
    case true:
      return (
        <select onChange={(e) => setId(e.target.value)}>
          <option disabled={true} value="">
            {defaultValue}
          </option>
          {Data.map((Item) => {
            return (
              <option value={Item._id} key={Item._id}>
                {Item[field]}
              </option>
            );
          })}
        </select>
      );
  }
}

export default Select;
