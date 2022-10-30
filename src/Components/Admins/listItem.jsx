import React from 'react';

const ListAdmin = ({ listAdmin, deleteAdmin }) => {
  const handleDelete = (id) => {
    fetch(`${process.env.REACT_APP_API_URL}/admins/${id}`, {
      method: 'DELETE'
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
        <button type="submit">Edit</button>
      </td>
      <td>
        <button onClick={() => handleDelete(listAdmin._id)}>Delete</button>
      </td>
    </tr>
  );
};
export default ListAdmin;
