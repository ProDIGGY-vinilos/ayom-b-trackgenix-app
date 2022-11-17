import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import MessageModal from '../../Shared/Modal/MessageModal';
import styles from '../tasks.module.css';
import Button from '../../Shared/Button/Button';
import InputField from '../../Shared/Input/input';
import { getOneTask, postTask, putTask } from '../../../redux/tasks/thunks';

const Form = () => {
  const taskId = useParams().id;
  const dispatch = useDispatch();
  const dataTask = useSelector((state) => state.tasks.list.find((task) => task._id === taskId));

  const [userInput, setNameValue] = useState({
    description: ''
  });

  const { error } = useSelector((state) => state.tasks);
  const [typeModal, setTypeModal] = useState('');
  const [textMessageModal, setTextMessageModal] = useState('');
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [isFetched, setIsFetched] = useState(false);

  const openMessageModal = () => {
    setShowMessageModal(true);
  };

  const closeMessageModal = () => {
    setShowMessageModal(false);
  };

  useEffect(() => {
    if (taskId) {
      if (dataTask === undefined) {
        dispatch(getOneTask(taskId));
        setIsFetched(true);
      }
    }
  }, []);

  useEffect(() => {
    if (taskId) {
      if (dataTask !== undefined) {
        setNameValue({ description: dataTask.description });
      } else if (isFetched) {
        setNameValue({ description: dataTask.description });
      }
    }
  }, [dataTask]);

  useEffect(() => {
    openModalOnError(error);
  }, [error]);

  const updateInput = async (e) => {
    setNameValue({ description: e.target.value });
  };

  const onSubmit = () => {
    if (taskId) {
      dispatch(putTask(taskId, userInput));
      setTypeModal('Success');
      setTextMessageModal('The Task was updated successfully');
      openMessageModal();
    } else {
      dispatch(postTask(userInput));
      setTypeModal('Success');
      setTextMessageModal('The Task was created successfully');
      openMessageModal();
    }
  };

  const openModalOnError = (error) => {
    if (error) {
      setTypeModal('Error');
      setTextMessageModal(error);
      openMessageModal();
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
