import { useEffect, useState } from 'react';
import Table from '../Shared/Table';
import styles from './tasks.module.css';
import MessageModal from '../Shared/Modal/MessageModal';
import Button from '../Shared/Button/Button';
import { useSelector, useDispatch } from 'react-redux';
import { getTasks, deleteTask } from '../../redux/tasks/thunks';

const Tasks = () => {
  const [typeModal, setTypeModal] = useState('');
  const [textModal, setTextModal] = useState('');
  const [showModal, setShowModal] = useState(false);

  const data = useSelector((state) => state.tasks.list);

  const { list: tasksList, isLoading, error } = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if (!data.length || data.length === 1) {
      dispatch(getTasks());
    }
  }, []);

  useEffect(() => {
    openModalOnError(error);
  }, [error]);

  const deleteTaskFunction = async (id) => {
    dispatch(deleteTask(id));
    if (error) {
      openModalOnError(error);
    } else {
      setTypeModal('Success');
      setTextModal('The Task was removed successfully');
      openModal();
    }
  };

  const columns = [
    { heading: 'Id', value: '_id' },
    { heading: 'Description', value: 'description' },
    { heading: 'Actions' }
  ];

  const openModalOnError = (error) => {
    if (error) {
      setTypeModal('Error');
      setTextModal(error);
      openModal();
    }
  };

  useEffect(() => {
    openModalOnError(error);
  }, [error]);

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
