import { useState } from 'react';
import styles from '../tasks.module.css';

function Form() {
  const [userInput, setNameValue] = useState({
    description: ''
  });

  const onChange = (e) => {
    setNameValue({ ...userInput, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const params = new URLSearchParams(window.location.search);
    const taskId = params.get('id');
    let options;
    let url;
    if (taskId !== null) {
      options = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userInput)
      };
      url = `${process.env.REACT_APP_API_URL}/tasks/${taskId}`;
    } else {
      options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userInput)
      };
      url = `${process.env.REACT_APP_API_URL}/tasks`;
    }
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      if (response.status !== 200 && response.status !== 201 && response.status !== 204) {
        throw new Error(data.message);
      }
      return data;
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className={styles.container}>
      <form className={styles.addItem} onSubmit={onSubmit}>
        <div>
          <label>Description: </label>
          <input type="text" name="description" value={userInput.description} onChange={onChange} />
        </div>
        <div>
          <button className={styles.addButton} type="submit">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default Form;
