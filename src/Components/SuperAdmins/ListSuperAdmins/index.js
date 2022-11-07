import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from '../Modal/modalSuperAdmin';
import styles from '../super-admins.module.css';
import MessageModal from '../../Shared/Modal';

const ListSuperAdmin = ({ sAdmin, onDeleteSuperAdmin }) => {
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

  const deleteSuperAdmin = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/superAdmins/${id}`, {
        method: 'DELETE'
      });
      if (response.status === 204) {
        onDeleteSuperAdmin(sAdmin._id);
      }
    } catch (error) {
      setTypeModal('Error');
      setTextModal(error);
      openMessageModal();
      return;
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
          openModal={showModal}
          closeModal={closeModal}
          deleteAction={deleteSuperAdmin}
          id={sAdmin._id}
          title={'DELETE ADMIN'}
          warningText={`Do you want to remove ${sAdmin.name}?`}
        />
        <button onClick={openModal}>Delete</button>
      </td>
      <MessageModal
        type={typeModal}
        isOpen={showMessageModal}
        message={textModal}
        handleClose={closeMessageModal}
        goBack={'/super-admins'}
      />
    </tr>
  );
};

export default ListSuperAdmin;
