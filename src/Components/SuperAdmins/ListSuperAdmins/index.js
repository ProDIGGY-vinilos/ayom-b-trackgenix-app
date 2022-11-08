import React from 'react';
import { useState } from 'react';
import DeleteModal from '../Modal/deleteModal';
import styles from './listSuperAdmins.module.css';

const ListSuperAdmin = ({ superAdmin, onDeleteSuperAdmin }) => {
  const [showModal, setModal] = useState(false);

  const openModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  const deleteSuperAdmin = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/superAdmins/${id}`, {
        method: 'DELETE'
      });
      if (response.status === 204) {
        alert(`Super Admin with id: ${superAdmin._id} has been deleted`);
        onDeleteSuperAdmin(superAdmin._id);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <tr key={superAdmin._id} className={styles.tableRow}>
      <td>{superAdmin._id}</td>
      <td className={styles.info}>{superAdmin.name}</td>
      <td className={styles.info}>{superAdmin.lastName}</td>
      <td className={styles.info}>{superAdmin.email}</td>
      <td className={styles.info}>{superAdmin.password}</td>
      <td className={styles.btn}>
        <a href={`super-admin-form/${superAdmin._id}`}>
          <button className={styles.btnEdit}>edit</button>
        </a>
      </td>
      <td className={styles.btn}>
        <DeleteModal
          openModal={showModal}
          closeModal={closeModal}
          deleteAction={deleteSuperAdmin}
          id={superAdmin._id}
          title={'DELETE ADMIN'}
          warningText={`Do you want to remove ${superAdmin.name}?`}
        />
        <button onClick={openModal} className={styles.btnDelete}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ListSuperAdmin;
