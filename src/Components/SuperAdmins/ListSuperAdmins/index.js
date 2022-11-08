import React from 'react';
import { useState } from 'react';
import Modal from '../Modal/modalSuperAdmin';
import styles from '../super-admins.module.css';
import PrimaryBtn from '../../Shared/Button/primaryBtn';
import SecondaryBtn from '../../Shared/Button/secondaryBtn';

const ListSuperAdmin = ({ sAdmin, onDeleteSuperAdmin }) => {
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
        <SecondaryBtn
          href={`super-admin-form/${sAdmin._id}`}
          style="rectangular"
          disabled={false}
          text="Edit"
        />
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
        <PrimaryBtn onClick={openModal} style="rectangular" disabled={false} text="Delete" />
      </td>
    </tr>
  );
};

export default ListSuperAdmin;
