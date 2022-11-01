//import styles from './select.module.css';

function Select({ Data, setId, field }) {
  return (
    <select onChange={(e) => setId(e.target.value)}>
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
