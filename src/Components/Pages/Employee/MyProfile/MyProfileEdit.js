import React from 'react';
import { getOneEmployee, putEmployee } from 'redux/employees/thunks';
import { schema } from 'Components/Employees/validation';
import ProfileForm from 'Components/Shared/ProfileForm';

const EmployeeForm = () => {
  return (
    <ProfileForm
      schema={schema}
      entity="employees"
      put={putEmployee}
      getOne={getOneEmployee}
      textEdit="Edit Employee"
      textNew={'New Employee'}
      textEditSuccess="Employee edited successfully"
      textNewSuccess="Employee created successfully"
      type="employee"
      href="/employee/profile"
    />
  );
};

export default EmployeeForm;
