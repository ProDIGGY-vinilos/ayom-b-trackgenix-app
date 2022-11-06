import { useState } from 'react';

function Select({ Data, setId, field }) {
  const [selected, setSelected] = useState('');

  const handleChange = (e) => {
    console.log(e);
    setId(e.target.value);
    setSelected();
  };

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
}

export default Select;
