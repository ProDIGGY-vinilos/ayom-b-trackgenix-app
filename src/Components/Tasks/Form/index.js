import { useState } from 'react';
import MessagePopUp from '../Modal/messageModal';
import styles from '../tasks.module.css';

function Form() {
  const [userInput, setNameValue] = useState({
    description: ''
  });

  const [showPopUp, setPopUp] = useState(false);
  const [statusPopUp, setStatusPopUp] = useState();
  const [textPopUp, setText] = useState(false);

  const openPopUp = () => {
    setPopUp(true);
  };

  const closePopUp = () => {
    setPopUp(false);
  };

  const setStatus = (status) => {
    setStatusPopUp(status);
  };

  const setTextFunction = (text) => {
    setText(text);
  };

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
      setStatus('PUT');
    } else {
      options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userInput)
      };
      url = `${process.env.REACT_APP_API_URL}/tasks`;
      setStatus('POST');
    }
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      if (response.status !== 200 && response.status !== 201 && response.status !== 204) {
        setStatus('Error');
        console.log(statusPopUp);
        setTextFunction(data.message);
        openPopUp();
        return;
      }
      setTextFunction(data.message);
      openPopUp();
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
        <div className={styles.buttonsDiv}>
          <button className={styles.addButton} type="submit">
            Save
          </button>
          <MessagePopUp
            show={showPopUp}
            status={statusPopUp}
            text={textPopUp}
            closePopUp={closePopUp}
          />

          <a href="/tasks" className={styles.goBackButton}>
            Go back
          </a>
        </div>
      </form>
    </div>
  );
}

export default Form;
