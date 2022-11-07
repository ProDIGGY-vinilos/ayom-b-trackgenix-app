import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form/index';
import Modal from '../Shared/Modal';
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
        <Link to={`task-form/${listTask._id}`}>
          <button className={styles.editButton} onClick={() => onSubmit(listTask)}>
            Edit
          </button>
        </Link>
      </td>
      <td>
        <Modal
          openModal={showPopUp}
          closeModal={closePopUp}
          confirmAction={deleteTaskFunction}
          title={'DELETE TASK'}
          warningText={`¿Are you sure you want to this task?`}
          declineButtonText={'Cancel'}
          confirmButtonText={'Confirm'}
        />
        <button className={styles.deleteButton} onClick={openPopUp}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ListTask;
