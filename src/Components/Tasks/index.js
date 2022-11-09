import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Table from '../Shared/Table';
import styles from './tasks.module.css';

const Tasks = () => {
  const [tasks, saveTasks] = useState([]);

  useEffect(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks`);
      const data = await response.json();
      if (response.status == 200) {
        saveTasks(data.data);
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert(error);
    }
  }, []);

  const deleteTask = (id) => {
    saveTasks([...tasks.filter((newTasks) => newTasks._id !== id)]);
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
      alert('Task delete successfully');
    } else if ([400, 404, 500].includes(response.status)) {
      const data = await response.json();
      alert(data.message);
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
      <Link to="/task-form" className={styles.newTask}>
        +
      </Link>
    </div>
  );
};

export default Tasks;
