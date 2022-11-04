import React from 'react';
import Button from './Button';
import Modal from './modal/modal';
import { useState } from 'react';

const Employee = ({ employee, onDeleteItem }) => {
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => {
    setShowModal(false);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const deleteEmployee = async (id) => {
    await fetch(`${process.env.REACT_APP_API_URL}/employees/${id}`, { method: 'DELETE' });
    onDeleteItem(id);
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
            deleteAction={deleteEmployee}
            id={employee._id}
            warningText={`Are you sure you want to remove Employee: ${employee.name}`}
            title={'DELETE EMPLOYEE'}
          />
          <Button color="blue" text="Edit" href={`/employee-form/${employee._id}`} />
          <Button color="red" text="Delete" onClick={openModal} />
        </td>
      </tr>
    </div>
  );
};

export default Employee;
