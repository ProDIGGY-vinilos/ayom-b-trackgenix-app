import React from 'react';

const Employee = ({ employee }) => {
  return (
    <td key={employee._id}>
      <p>{employee.employee.lastName}</p>
      <p>{employee.role}</p>
      <p>{employee.rate}</p>
    </td>
  );
};

export default Employee;
