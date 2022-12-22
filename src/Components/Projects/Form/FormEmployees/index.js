import React from 'react';
import styles from 'Components/Projects/Form/FormEmployees/formemployee.module.css';
import InputField from 'Components/Shared/Input/input';
import Select from 'Components/Shared/Select';

const FormEmployee = ({ register, errors, employees }) => {
  const roles = [{ role: 'DEV' }, { role: 'QA' }, { role: 'PM' }, { role: 'TL' }];
  return (
    <div className={styles.employees}>
      <Select
        options={employees}
        field="lastName"
        name="employees[0].employee"
        label="Employee"
        register={register}
        error={errors.employees?.employee?.message}
      />
      <Select
        options={roles}
        field="role"
        name="employees[0].role"
        label="Role"
        register={register}
        error={errors.employees?.role?.message}
      />
      <div>
        <InputField
          name="employees[0].rate"
          type="number"
          placeholder="Rate"
          label="Rate"
          register={register}
          error={errors.employees?.rate?.message}
        />
      </div>
    </div>
  );
};

export default FormEmployee;
