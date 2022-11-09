import { useEffect, useState } from 'react';
import Table from '../Shared/Table';
import styles from './tasks.module.css';
import MessageModal from '../Shared/Modal/MessageModal';
import Button from '../Shared/Button/Button';

function Tasks() {
  const [tasks, saveTasks] = useState([]);

  const [typeModal, setTypeModal] = useState();
  const [textModal, setTextModal] = useState();
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks`);
      const data = await response.json();
      if (response.status == 200) {
        saveTasks(data.data);
      } else {
        setTypeModal('Error');
        setTextModal(data.message);
        openModal();
        return;
      }
    } catch (error) {
      setTypeModal('Error');
      setTextModal(error);
      openModal();
      return;
    }
  }, []);

  const deleteTask = (id) => {
    saveTasks([...tasks.filter((newTasks) => newTasks._id !== id)]);
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
      deleteTask(id);
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

  return (
    <div className={styles.container}>
      <h2>Tasks</h2>
      <Table data={tasks} columns={columns} deleteItem={deleteTaskFunction} edit="/task-form" />
      <Button href="/task-form" style="roundedPrimary" disabled={false} text="+" />
      <MessageModal
        type={typeModal}
        isOpen={showModal}
        message={textModal}
        handleClose={closeModal}
      />
    </div>
  );
}

export default Tasks;
