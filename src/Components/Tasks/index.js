import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './tasks.module.css';
import List from './tasksList';

function Tasks() {
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

  return (
    <div className={styles.container}>
      <h2>Tasks</h2>
      <Link to="/task-form" className={styles.addButton}>
        Add a new task
      </Link>
      <List list={tasks} saveTasks={saveTasks} deleteItem={deleteTask} />
    </div>
  );
}

export default Tasks;
