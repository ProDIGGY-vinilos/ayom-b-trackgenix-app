import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from '../Shared/Modal';

const RowAdmin = ({ listAdmin, deleteAdmin }) => {
  const [showModal, setModal] = useState(false);

  const openModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  const removeAdmin = async () => {
    deleteAdmin(listAdmin._id);
    await fetch(`${process.env.REACT_APP_API_URL}/admins/${listAdmin._id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(listAdmin)
    });
    alert('The administrator was successfully removed');
  };
  return (
    <tr>
      <td>{listAdmin._id}</td>
      <td>{listAdmin.name}</td>
      <td>{listAdmin.lastName}</td>
      <td>{listAdmin.email}</td>
      <td>{listAdmin.password}</td>
      <td>
        <Link to={`admin-form/${listAdmin._id}`}>
          <img src={`../assets/images/iconEdit.svg`} />
        </Link>
      </td>
      <td>
        <Modal
          openModal={showModal}
          closeModal={closeModal}
          confirmAction={removeAdmin}
          title={'DELETE ADMIN'}
          warningText={`¿Are you sure you want to delete ${listAdmin.name}?`}
          declineButtonText={'Cancel'}
          confirmButtonText={'Confirm'}
        />
        <button onClick={openModal}>
          <img src={`../assets/images/iconTrash.svg`} />
        </button>
      </td>
    </tr>
  );
};
export default RowAdmin;
