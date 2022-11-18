import React from 'react';
import styles from './formemployee.module.css';
import InputField from '../../../Shared/Input/input';
import Select from '../../../Shared/Select';
import { useForm } from 'react-hook-form';
import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';

const FormEmployee = ({ employees, employee, changeValue }) => {
  const roles = [{ role: 'DEV' }, { role: 'QA' }, { role: 'PM' }, { role: 'TL' }];
  const schema = Joi.object({
    name: Joi.string()
  });

  const {
    register,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: joiResolver(schema)
  });
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
          register={register}
          error={errors.rate?.message}
        />
      </div>
    </div>
  );
};

export default FormEmployee;
