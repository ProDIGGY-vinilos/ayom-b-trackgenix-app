import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from '../../Shared/Modal';
import styles from '../super-admins.module.css';

const ListSuperAdmin = ({ sAdmin, onDeleteSuperAdmin }) => {
  const [showModal, setModal] = useState(false);

  const openModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  const deleteSuperAdmin = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/superAdmins/${sAdmin._id}`, {
        method: 'DELETE'
      });
      if (response.status === 204) {
        alert(`Super Admin with id: ${sAdmin._id} has been deleted`);
        onDeleteSuperAdmin(sAdmin._id);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <tr key={sAdmin._id}>
      <td>{sAdmin._id}</td>
      <td className={styles.info}>{sAdmin.name}</td>
      <td className={styles.info}>{sAdmin.lastName}</td>
      <td className={styles.info}>{sAdmin.email}</td>
      <td className={styles.info}>{sAdmin.password}</td>
      <td className={styles.btn}>
        <Link to={`super-admin-form/${sAdmin._id}`}>
          <button>edit</button>
        </Link>
      </td>
      <td className={styles.btn}>
        <Modal
          showModal={showModal}
          closeModal={closeModal}
          confirmAction={deleteSuperAdmin}
          title={'DELETE SUPER ADMIN'}
          message={`Are you sure you want to delete ${sAdmin.name}?`}
        />
        <button onClick={openModal}>Delete</button>
      </td>
    </tr>
  );
};

export default ListSuperAdmin;
