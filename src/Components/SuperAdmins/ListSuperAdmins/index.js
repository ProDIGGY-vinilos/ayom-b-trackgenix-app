import React from 'react';
import { useState } from 'react';
import Modal from '../Modal/modalSuperAdmin';
import styles from '../super-admins.module.css';

const ListSuperAdmin = ({ sAdmin, onDeleteSuperAdmin }) => {
  const [showModal, setModal] = useState(false);

  const openModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  const deleteSuperAdmin = async (id) => {
    await fetch(`${process.env.REACT_APP_API_URL}/superAdmins/${id}`, {
      method: 'DELETE'
    });
    onDeleteSuperAdmin(sAdmin._id);
  };

  return (
    <tr key={sAdmin._id}>
      <td>{sAdmin._id}</td>
      <td className={styles.info}>{sAdmin.name}</td>
      <td className={styles.info}>{sAdmin.lastName}</td>
      <td className={styles.info}>{sAdmin.email}</td>
      <td className={styles.info}>{sAdmin.password}</td>
      <td className={styles.btn}>
        <a href={`super-admin-form/${sAdmin._id}`}>
          <button>edit</button>
        </a>
      </td>
      <td className={styles.btn}>
        <Modal
          openModal={showModal}
          closeModal={closeModal}
          deleteAction={deleteSuperAdmin}
          id={sAdmin._id}
          title={'DELETE ADMIN'}
          warningText={`Do you want to remove ${sAdmin.name}?`}
        />
        <button onClick={openModal}>Delete</button>
      </td>
    </tr>
  );
};

export default ListSuperAdmin;
