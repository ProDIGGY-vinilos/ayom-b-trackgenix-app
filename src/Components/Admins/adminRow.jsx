import React from 'react';
import { useState } from 'react';
import Modal from '../Shared/Modal/ActionModal';
import Button from '../Shared/Button/Button';

const RowAdmin = ({ listAdmin, deleteAdmin }) => {
  const [showModal, setModal] = useState(false);

  const openModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  const removeAdmin = async () => {
    await fetch(`${process.env.REACT_APP_API_URL}/admins/${listAdmin._id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(listAdmin)
    });
    deleteAdmin(listAdmin._id);
  };

  return (
    <tr>
      <td>{listAdmin._id}</td>
      <td>{listAdmin.name}</td>
      <td>{listAdmin.lastName}</td>
      <td>{listAdmin.email}</td>
      <td>{listAdmin.password}</td>
      <td>
        <Button
          href={`admin-form/${listAdmin._id}`}
          style="squaredSecondary"
          disabled={false}
          text="Edit"
        />
      </td>
      <td>
        <Modal
          showModal={showModal}
          closeModal={closeModal}
          confirmAction={removeAdmin}
          title={'DELETE ADMIN'}
          message={`Are you sure you want to delete ${listAdmin.name}?`}
        />
        <Button onClick={openModal} style="squaredPrimary" disabled={false} text="Delete" />
      </td>
    </tr>
  );
};
export default RowAdmin;
