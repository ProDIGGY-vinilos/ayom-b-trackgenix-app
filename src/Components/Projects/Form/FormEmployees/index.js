import React from 'react';
import styles from 'Components/Projects/Form/FormEmployees/formemployee.module.css';
import InputField from 'Components/Shared/Input/input';
import Select from 'Components/Shared/Select';

const FormEmployee = ({ register, /* errors, */ employees, employee }) => {
  const roles = [{ role: 'DEV' }, { role: 'QA' }, { role: 'PM' }, { role: 'TL' }];
  return (
    <div className={styles.employees}>
      <Select
        selectedValue={employee?.employee}
        options={employees}
        field="lastName"
        name="employeeId"
        label="Employees"
        register={register}
      />
      <Select
        selectedValue={employee?.role}
        options={roles}
        field="role"
        name="role"
        label="Role"
        register={register}
      />
      <div>
        <InputField name="rate" type="number" placeholder="Rate" label="Rate" register={register} />
      </div>
    </div>
  );
};

export default FormEmployee;
