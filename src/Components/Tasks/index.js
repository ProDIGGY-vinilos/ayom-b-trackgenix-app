import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './tasks.module.css';
import List from './tasksList';
import Modal from '../Shared/Modal';

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

  return (
    <div className={styles.container}>
      <h2>Tasks</h2>
      <Link to="/task-form" className={styles.addButton}>
        Add a new task
      </Link>
      <List list={tasks} saveTasks={saveTasks} deleteItem={deleteTask} />
      <Modal
        type={typeModal}
        isOpen={showModal}
        message={textModal}
        handleClose={closeModal}
        goBack={'/tasks'}
      />
    </div>
  );
}

export default Tasks;
