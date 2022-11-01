import React from 'react';
import { useState } from 'react';
import Modal from '../Admins/modalAdmin';

const RowAdmin = ({ listAdmin, deleteAdmin }) => {
  const [showModal, setModal] = useState(false);

  const openModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  const onCloseModal = () => {
    deleteAdmin(listAdmin._id);
    fetch(`${process.env.REACT_APP_API_URL}/admins/${listAdmin._id}`, {
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
        <a href={`admins/form?id=${listAdmin._id}`}>
          <button>
            <img src={`${process.env.PUBLIC_URL}/assets/images/iconEdit.svg`} />
          </button>
        </a>
      </td>
      <td>
        <Modal
          show={showModal}
          closeModal={closeModal}
          onCloseModal={onCloseModal}
          id={listAdmin._id}
          title={'DELETE ADMIN'}
          text={`Do you want to remove ${listAdmin.name}?`}
        />
        <button onClick={openModal}>
          <img src={`${process.env.PUBLIC_URL}/assets/images/iconTrash.svg`} />
        </button>
      </td>
    </tr>
  );
};
export default RowAdmin;
