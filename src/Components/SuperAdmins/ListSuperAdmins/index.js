import React from 'react';
import { useState } from 'react';
import Modal from '../../Shared/Modal/ActionModal';
import styles from '../super-admins.module.css';
import MessageModal from '../../Shared/Modal/MessageModal';

const ListSuperAdmin = ({ superAdmin, onDeleteSuperAdmin }) => {
  const [showModal, setModal] = useState(false);
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
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  const deleteSuperAdmin = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/superAdmins/${superAdmin._id}`,
        {
          method: 'DELETE'
        }
      );
      if (response.status === 204) {
        onDeleteSuperAdmin(superAdmin._id);
      }
    } catch (error) {
      setTypeModal('Error');
      setTextModal(error);
      openMessageModal();
      return;
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
        <Modal
          showModal={showModal}
          closeModal={closeModal}
          confirmAction={deleteSuperAdmin}
          title={'DELETE SUPER ADMIN'}
          message={`Are you sure you want to delete ${superAdmin.name}?`}
        />
        <button onClick={openModal} className={styles.btnDelete}>
          Delete
        </button>
      </td>
      <MessageModal
        type={typeModal}
        isOpen={showMessageModal}
        message={textModal}
        handleClose={closeMessageModal}
      />
    </tr>
  );
};

export default ListSuperAdmin;
