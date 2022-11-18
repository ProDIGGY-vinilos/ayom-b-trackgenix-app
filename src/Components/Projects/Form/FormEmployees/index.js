import React from 'react';
import styles from 'Components/Projects/Form/FormEmployees/formemployee.module.css';
import InputField from 'Components/Shared/Input/input';
import Select from 'Components/Shared/Select';

const FormEmployee = ({ employees, employee, changeValue }) => {
  const roles = [{ role: 'DEV' }, { role: 'QA' }, { role: 'PM' }, { role: 'TL' }];

  return (
    <div className={styles.employees}>
      <Select
        selectedValue={employee?.employee}
        options={employees}
        changeValue={(value) => changeValue('employee', value, true)}
        field="lastName"
        label="Employees"
      />
      <Select
        selectedValue={employee?.role}
        options={roles}
        changeValue={(value) => changeValue('role', value, true)}
        field="role"
        label="Role"
      />
      <div>
        <InputField
          name="rate"
          value={employee?.rate}
          type="number"
          placeholder="Rate"
          onChange={(e) => changeValue('rate', e.target.value, true)}
          label="Rate"
        />
      </div>
    </div>
  );
};

export default FormEmployee;
