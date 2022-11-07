import React from 'react';
import Button from './Button';
import Modal from '../Shared/Modal';
import { useState } from 'react';

const Employee = ({ employee, onDeleteItem }) => {
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => {
    setShowModal(false);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const deleteEmployee = async () => {
    onDeleteItem(employee._id);
    await fetch(`${process.env.REACT_APP_API_URL}/employees/${employee._id}`),
      {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(employee)
      };
    alert('The administrator was successfully removed');
  };

  return (
    <div className="employee" key={employee._id}>
      <tr>
        <td>{employee.name}</td>
        <td>{employee.lastName}</td>
        <td>{employee.email}</td>
        <td>{employee.phone}</td>
        <td>
          <Modal
            openModal={showModal}
            closeModal={closeModal}
            confirmAction={deleteEmployee}
            title={'DELETE EMPLOYEE'}
            warningText={`¿Are you sure you want to delete ${employee.name}?`}
            declineButtonText={'Cancel'}
            confirmButtonText={'Confirm'}
          />
          <Button color="blue" text="Edit" href={`/employee-form/${employee._id}`} />
          <button onClick={openModal}>Delete</button>
        </td>
      </tr>
    </div>
  );
};

export default Employee;
