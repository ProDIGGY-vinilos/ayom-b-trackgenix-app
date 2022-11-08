import React from 'react';
import styles from './formemployee.module.css';
import InputField from '../../../Shared/Input/input';
const FormEmployee = ({ employees, employee, changeValue }) => {
  const roles = ['DEV', 'QA', 'PM', 'TL'];

  return (
    <div className={styles.employees}>
      <div>
        <label>Employee: </label>
        <select onChange={(e) => changeValue('employee', e.target.value, true)}>
          <option value="" className={styles.displayNone} selected></option>
          {employees.map((singleEmployee) => {
            return (
              <option
                value={singleEmployee._id}
                key={singleEmployee._id}
                selected={employee && singleEmployee._id === employee.employee}
              >
                {singleEmployee.lastName}
              </option>
            );
          })}
        </select>
      </div>
      <div>
        <label>Role: </label>
        <select onChange={(e) => changeValue('role', e.target.value, true)}>
          <option value="" className={styles.displayNone} selected></option>
          {roles.map((role) => {
            return (
              <option value={role} key={role.index} selected={employee && role === employee.role}>
                {role}
              </option>
            );
          })}
        </select>
      </div>
      <div>
        <InputField
          label="Rate"
          name="rate"
          type="number"
          value={employee ? employee.rate : undefined}
          onChange={(value) => changeValue('rate', value, true)}
        />
      </div>
    </div>
  );
};

export default FormEmployee;
