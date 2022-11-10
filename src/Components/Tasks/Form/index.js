import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import MessageModal from '../../Shared/Modal/MessageModal';
import styles from '../tasks.module.css';
import stylesModal from '../Modal/tasks.module.css';
import InputField from '../../Shared/Input/input';

function Form() {
  const taskId = useParams().id;

  const [userInput, setNameValue] = useState({
    description: ''
  });

  const [showModal, setShowModal] = useState(false);
  const [typeModal, setTypeModal] = useState();
  const [textModal, setTextModal] = useState();

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(async () => {
    if (taskId) {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks/${taskId}`);
      const data = await response.json();
      setNameValue({ ...userInput, description: data.data.description });
    }
  }, []);

  const updateInput = async (e) => {
    setNameValue({ ...userInput, description: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    let options;
    let url;
    if (taskId) {
      options = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userInput)
      };
      url = `${process.env.REACT_APP_API_URL}/tasks/${taskId}`;
      setTypeModal('Success');
    } else {
      options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userInput)
      };
      url = `${process.env.REACT_APP_API_URL}/tasks`;
      setTypeModal('Success');
    }
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      if (response.status !== 200 && response.status !== 201 && response.status !== 204) {
        setTypeModal('Error');
        setTextModal(data.message);
        openModal();
        return;
      }
      setTextModal(data.message);
      openModal();
      return data;
    } catch (error) {
      setTypeModal('Error');
      setTextModal(error);
      openModal();
      return;
    }
  };
  return (
    <div className={styles.container}>
      <form className={styles.addItem} onSubmit={onSubmit}>
        <div>
          <InputField
            label="Description"
            name="description"
            type="text"
            placeholder="description"
            value={userInput.description}
            onChange={updateInput}
          />
        </div>
        <div className={styles.buttonsDiv}>
          <button className={styles.addButton} type="submit">
            Save
          </button>
          <MessageModal
            type={typeModal}
            isOpen={showModal}
            message={textModal}
            handleClose={closeModal}
            goBack={'/tasks'}
          />
          <Link to="/tasks" className={stylesModal.goBackButton}>
            Go back
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Form;
