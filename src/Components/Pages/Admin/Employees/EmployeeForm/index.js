import React from 'react';
import { getOneEmployee, putEmployee } from 'redux/employees/thunks';
import { schema } from 'Components/Employees/validation';
import ProfileForm from 'Components/Shared/ProfileForm';

const EmployeeForm = () => {
  return (
    <ProfileForm
      schema={schema}
      entity="employees"
      post={undefined}
      put={putEmployee}
      getOne={getOneEmployee}
      textEdit="Edit Employee"
      textNew="New Employee"
      type="employee"
      href="/admin/employees"
    />
  );
};

export default EmployeeForm;
