import React from 'react';
import { useState } from 'react';
import Form from './Form/index';
import PopUp from './Modal/taskModal';
import styles from './tasks.module.css';

const ListTask = ({ listTask, deleteTask }) => {
  const [showPopUp, setShowPopUp] = useState(false);

  const openPopUp = () => {
    setShowPopUp(true);
  };

  const closePopUp = () => {
    setShowPopUp(false);
  };

  const deleteTaskFunction = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks/${listTask._id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(listTask)
    });
    if (response.status == 204) {
      deleteTask(listTask._id);
    } else if ([400, 404, 500].includes(response.status)) {
      const data = await response.json();
      alert(data.message);
    }
  };

  const onSubmit = (list) => {
    <Form editList={list} saveTasks={list} />;
  };

  return (
    <tr>
      <td>{listTask._id}</td>
      <td>{listTask.description}</td>
      <td>
        <a href={`task-form?id=${listTask._id}`}>
          <button className={styles.editButton} onClick={() => onSubmit(listTask)}>
            Edit
          </button>
        </a>
      </td>
      <td>
        <PopUp
          show={showPopUp}
          closePopUp={closePopUp}
          cancelAction={deleteTaskFunction}
          id={listTask._id}
          title={'Are you sure?'}
          text={`Deleting a task cannot be undone`}
        />
        <button className={styles.deleteButton} onClick={openPopUp}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ListTask;
