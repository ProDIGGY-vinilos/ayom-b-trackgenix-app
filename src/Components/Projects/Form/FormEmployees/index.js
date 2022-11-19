import React from 'react';
import { useForm } from 'react-hook-form';
import styles from 'Components/Projects/Form/FormEmployees/formemployee.module.css';
import InputField from 'Components/Shared/Input/input';
import Select from 'Components/Shared/Select';

const FormEmployee = ({ employees }) => {
  const roles = [{ role: 'DEV' }, { role: 'QA' }, { role: 'PM' }, { role: 'TL' }];
  const { register } = useForm();
  return (
    <div className={styles.employees}>
      <Select
        options={employees}
        field="lastName"
        name="employeeId"
        label="Employees"
        register={register}
      />
      <Select options={roles} field="role" name="role" label="Role" register={register} />
      <div>
        <InputField name="rate" type="number" placeholder="Rate" label="Rate" register={register} />
      </div>
    </div>
  );
};

export default FormEmployee;
