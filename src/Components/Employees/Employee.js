import React from 'react';
import Button from './Button';

const Employee = ({ employee, onClickDelete }) => {
  return (
    <div className="employee" key={employee._id}>
      <tr>
        <td>{employee.name}</td>
        <td>{employee.lastName}</td>
        <td>{employee.email}</td>
        <td>{employee.phone}</td>
        <td>
          <Button color="blue" text="Edit" href={`/employee-form/${employee._id}`} />
          <Button color="red" text="Delete" onClick={() => onClickDelete(employee._id)} />
        </td>
      </tr>
    </div>
  );
};

export default Employee;
