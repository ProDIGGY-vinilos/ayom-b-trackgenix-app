import React from 'react';
import { useState } from 'react';
import Modal from './Modal/modalAdmin';

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
    await fetch(`../assets/admins/${listAdmin._id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(listAdmin)
    });
  };
  return (
    <tr>
      <td>{listAdmin._id}</td>
      <td>{listAdmin.name}</td>
      <td>{listAdmin.lastName}</td>
      <td>{listAdmin.email}</td>
      <td>{listAdmin.password}</td>
      <td>
        <a href={`admins-form/${listAdmin._id}`}>
          <button type="button">
            <img src={`../assets/images/iconEdit.svg`} />
          </button>
        </a>
      </td>
      <td>
        <Modal
          openModal={showModal}
          closeModal={closeModal}
          deleteAction={removeAdmin}
          id={listAdmin._id}
          title={'DELETE ADMIN'}
          warningText={`Do you want to remove ${listAdmin.name}?`}
        />
        <button onClick={openModal}>
          <img src={`${process.env.PUBLIC_URL}/assets/images/iconTrash.svg`} />
        </button>
      </td>
    </tr>
  );
};
export default RowAdmin;
