import React from 'react';
import Form from './editAdminForm';

const ListAdmin = ({ listAdmin, deleteAdmin }) => {
  const handleDelete = (id) => {
    fetch(`${process.env.REACT_APP_API_URL}/admins/${id}`, {
      method: 'DELETE'
    });
    deleteAdmin(id);
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
        <button onClick={() => handleDelete(listAdmin._id)}>Delete</button>
      </td>
    </tr>
  );
};
export default ListAdmin;
