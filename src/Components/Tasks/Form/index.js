import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import MessageModal from '../../Shared/Modal/MessageModal';
import styles from '../tasks.module.css';
import Button from '../../Shared/Button/Button';
import InputField from '../../Shared/Input/input';
import { postTask } from '../../../redux/tasks/thunks';

const Form = () => {
  const taskId = useParams().id;
  const dispatch = useDispatch();

  const [userInput, setNameValue] = useState({
    description: ''
  });

  const { error } = useSelector((state) => state.tasks);
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

  const onSubmit = async () => {
    if (taskId) {
      console.log('Not made yet');
    } else {
      dispatch(postTask(userInput));
      if (error !== '') {
        setTypeModal('Error');
        setTextModal(error);
        openModal();
      } else {
        setTextModal('Created');
        openModal();
      }
    }
  };

  /* const onSubmit = async () => {
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
  }; */
  return (
    <div className={styles.container}>
      <form className={styles.addItem} onSubmit={onSubmit}>
        <Button href="/tasks" style="roundedSecondary" diabled={false} text="X" />
        <div>
          <InputField
            label="Description"
            name="description"
            type="text"
            placeholder="description"
            value={userInput.description}
            onChange={(e) => updateInput(e)}
          />
        </div>
        <div className={styles.buttonsDiv}>
          <Button onClick={onSubmit} style="squaredPrimary" disabled={false} text="Save" />
          <MessageModal
            type={typeModal}
            isOpen={showModal}
            message={textModal}
            handleClose={closeModal}
            goBack={'/tasks'}
          />
        </div>
      </form>
    </div>
  );
};

export default Form;
