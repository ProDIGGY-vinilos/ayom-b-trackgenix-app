import { useEffect, useState } from 'react';
import Table from '../Shared/Table';
import styles from './tasks.module.css';
import MessageModal from '../Shared/Modal/MessageModal';
import Button from '../Shared/Button/Button';
import { useSelector, useDispatch } from 'react-redux';
import { getTasks } from '../../redux/tasks/thunks';

const Tasks = () => {
  const [typeModal, setTypeModal] = useState();
  const [textModal, setTextModal] = useState();
  const [showModal, setShowModal] = useState(false);

  const { list: tasksList, isLoading, error } = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(async () => {
    dispatch(getTasks());
  }, []);

  const deleteTask = () => {
    dispatch(getTasks());
    setTypeModal('Success');
    setTextModal('The task was successfully removed');
    openModal();
  };

  const deleteTaskFunction = async (id) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json'
      }
    });
    if (response.status == 204) {
      deleteTask();
    } else if ([400, 404, 500].includes(response.status)) {
      const data = await response.json();
      setTypeModal('Error');
      setTextModal(data.message);
      openModal();
      return;
    }
  };

  const columns = [
    { heading: 'Id', value: '_id' },
    { heading: 'Description', value: 'description' },
    { heading: 'Actions' }
  ];

  if (error) {
    setTypeModal('Error');
    setTextModal(error);
    openModal();
  }

  return (
    <div className={styles.container}>
      <h2>Tasks</h2>
      {isLoading ? (
        <h3>Loading...</h3>
      ) : (
        <>
          <Table
            data={tasksList}
            columns={columns}
            deleteItem={deleteTaskFunction}
            edit="/task-form"
          />
          <MessageModal
            type={typeModal}
            isOpen={showModal}
            message={textModal}
            handleClose={closeModal}
          />
          <Button href="/task-form" style="roundedPrimary" disabled={false} text="+" />
        </>
      )}
    </div>
  );
};

export default Tasks;
