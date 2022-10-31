import React from 'react';
import { useState } from 'react';
import Form from './editAdminForm';
import Modal from '../Admins/modalAdmin';

const ListAdmin = ({ listAdmin, deleteAdmin }) => {
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
  const onSubmit = (list) => {
    <Form editList={list} saveAdmins={list} />;
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
          <button onClick={() => onSubmit(listAdmin)}>Edit</button>
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
        <button onClick={openModal}>Delete</button>
      </td>
    </tr>
  );
};
export default ListAdmin;
