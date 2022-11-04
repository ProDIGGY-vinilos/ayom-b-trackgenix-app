import React from 'react';

const EmployeeItem = ({ employee, index }) => {
  return (
    <td key={index}>
      <p>{employee.employee?.lastName}</p>
      <p>{employee.role}</p>
      <p>{employee.rate}</p>
    </td>
  );
};

export default EmployeeItem;
