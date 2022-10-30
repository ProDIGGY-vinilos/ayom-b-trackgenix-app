import React from 'react';

const Employee = ({ employee }) => {
  return (
    <td>
      <p>{employee.employee.name}</p>
      <p>{employee.role}</p>
      <p>{employee.rate}</p>
    </td>
  );
};

export default Employee;
