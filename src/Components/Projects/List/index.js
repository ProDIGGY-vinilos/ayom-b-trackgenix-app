import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Employee from './Employees';
import styles from './list.module.css';
import Modal from '../../Shared/Modal';

const ProjectList = ({ projectItem, onDeleteItem }) => {
  const [showModal, setShowModal] = useState(false);

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

    if (response.status === 200) {
      onDeleteItem(projectItem._id);
      alert(data.msg);
    } else if ([404, 500].includes(response.status)) {
      alert(data.msg);
    } else if (response.status === 400) {
      alert(data.message);
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
        openModal={showModal}
        closeModal={closeModal}
        confirmAction={deleteItem}
        title={'DELETE PROJECT'}
        warningText={`¿Are you sure you want to delete ${projectItem.name}?`}
        declineButtonText={'Cancel'}
        confirmButtonText={'Confirm'}
      />
    </>
  );
};

export default ProjectList;
