import React from 'react';
import Button from './Button';

const Employee = ({ employee, onClickDelete }) => {
  return (
    <div className="employee" key={employee._id}>
      <h4>{employee.name}</h4>
      <h4>{employee.lastName}</h4>
      <h4>{employee.email}</h4>
      <h4>{employee.phone}</h4>
      <Button color="blue" text="Edit" />
      <Button color="red" text="Delete" onClick={() => onClickDelete(employee._id)} />
    </div>
  );
};

export default Employee;
