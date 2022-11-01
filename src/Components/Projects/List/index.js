import React, { useState } from 'react';
import Employee from '../Employees';
import styles from './list.module.css';
import Modal from '../Modal';

const List = ({ projectItem, onDeleteItem }) => {
  const [showModal, setShowModal] = useState(false);
  const urlId = `/project-form/${projectItem._id}`;

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const deleteItem = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}api/projects/${projectItem._id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json'
        }
      }
    );
    const data = await response.json();

    if (response.status === 200) {
      onDeleteItem(projectItem._id);
      alert(data.msg);
    } else if (response.status === 400) {
      alert(data.message);
    } else if (response.status === 404) {
      alert(data.msg);
    } else if (response.status === 500) {
      alert(data.msg);
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
        {projectItem.employees.map((employee) => {
          return <Employee key={employee._id} employee={employee} />;
        })}
        <td>
          <button className={styles.btn}>
            <a className={styles.btnText} href={urlId}>
              Edit Project
            </a>
          </button>
          <button className={`${styles.btnBlack} ${styles.btnText}`} onClick={openModal}>
            Delete Project
          </button>
        </td>
      </tr>
      <Modal
        show={showModal}
        closeModal={closeModal}
        onDelete={deleteItem}
        id={projectItem._id}
        title={'Delete Project?'}
        text={`Are you sure you want to delete project "${projectItem.name}"?`}
      />
    </>
  );
};

export default List;
