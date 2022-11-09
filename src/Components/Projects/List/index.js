import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Employee from './Employees';
import styles from './list.module.css';
import MessageModal from '../../Shared/Modal/MessageModal';
import Modal from '../../Shared/Modal/ActionModal';

const ProjectList = ({ projectItem, onDeleteItem }) => {
  const [showModal, setShowModal] = useState(false);
  const [typeModal, setTypeModal] = useState();
  const [textModal, setTextModal] = useState();
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

  const deleteItem = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/projects/${projectItem._id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json'
      }
    });
    const data = await response.json();

    if (response.status === 204) {
      onDeleteItem(projectItem._id);
    } else if ([400, 404, 500].includes(response.status)) {
      setTypeModal('Error');
      setTextModal(data.message);
      openMessageModal();
      return;
    }
  };

  return (
    <>
      <tr key={projectItem._id} className={styles.borderBottom}>
        <td>{projectItem.name}</td>
        <td>{projectItem.description.substring(0, 10)}...</td>
        <td>{projectItem.startDate.substring(0, 10)}</td>
        <td>{projectItem.endDate.substring(0, 10)}</td>
        <td>{projectItem.clientName}</td>
        {projectItem.employees.map((employee, index) => {
          return <Employee key={employee._id} employee={employee} index={index} />;
        })}
        <td>
          <Link className={styles.btnText} to={`/project-form/${projectItem._id}`}>
            <button className={styles.btn}>Edit Project</button>
          </Link>
          <button className={`${styles.btnBlack} ${styles.btnText}`} onClick={openModal}>
            Delete Project
          </button>
        </td>
      </tr>
      <Modal
        showModal={showModal}
        closeModal={closeModal}
        confirmAction={deleteItem}
        title={'DELETE PROJECT'}
        message={`Are you sure you want to delete ${projectItem.name}?`}
      />
      <MessageModal
        type={typeModal}
        isOpen={showMessageModal}
        message={textModal}
        handleClose={closeMessageModal}
      />
    </>
  );
};

export default ProjectList;
