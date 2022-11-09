import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form/index';
import Modal from '../Shared/Modal/ActionModal';
import MessageModal from '../Shared/Modal/MessageModal';
import styles from './tasks.module.css';

const ListTask = ({ listTask, deleteTask }) => {
  const [typeModal, setTypeModal] = useState();
  const [textModal, setTextModal] = useState();
  const [showModal, setShowModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);

  const openMessageModal = () => {
    setShowMessageModal(true);
  };

  const closeMessageModal = () => {
    setShowMessageModal(false);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
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
      setTypeModal('Error');
      setTextModal(data.message);
      openMessageModal();
      return;
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
          showModal={showModal}
          closeModal={closeModal}
          confirmAction={deleteTaskFunction}
          title={'DELETE TASK'}
          message={`Are you sure you want to delete this task?`}
        />
        <MessageModal
          type={typeModal}
          isOpen={showMessageModal}
          message={textModal}
          handleClose={closeMessageModal}
        />
        <button className={styles.deleteButton} onClick={openModal}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ListTask;
