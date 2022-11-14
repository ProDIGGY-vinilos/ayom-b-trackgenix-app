import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import MessageModal from '../../Shared/Modal/MessageModal';
import styles from '../tasks.module.css';
import Button from '../../Shared/Button/Button';
import InputField from '../../Shared/Input/input';
import { postTask, putTask } from '../../../redux/tasks/thunks';

const Form = () => {
  const taskId = useParams().id;
  const dispatch = useDispatch();

  const [userInput, setNameValue] = useState({
    description: ''
  });

  const { error, modal } = useSelector((state) => state.tasks);
  const [typeModal, setTypeModal] = useState();
  const [textMessageModal, setTextMessageModal] = useState();
  const [showMessageModal, setShowMessageModal] = useState(false);

  const openMessageModal = () => {
    setShowMessageModal(true);
  };

  const closeMessageModal = () => {
    setShowMessageModal(false);
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

  useEffect(() => {
    if (error !== '') {
      setTypeModal('Error');
      setTextMessageModal(error);
      openMessageModal();
    } else if (modal) {
      setTypeModal('Success');
      taskId
        ? setTextMessageModal('The Task was updated successfully')
        : setTextMessageModal('The Task was created successfully');
      openMessageModal();
      return;
    }
  }, [modal, error]);

  const onSubmit = async () => {
    if (taskId) {
      dispatch(putTask(taskId, userInput));
    } else {
      dispatch(postTask(userInput));
    }
  };

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
            isOpen={showMessageModal}
            message={textMessageModal}
            handleClose={closeMessageModal}
            goBack={'/tasks'}
          />
        </div>
      </form>
    </div>
  );
};

export default Form;
