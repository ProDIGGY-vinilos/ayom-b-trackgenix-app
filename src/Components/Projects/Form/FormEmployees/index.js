import React from 'react';
import styles from './formemployee.module.css';
import Select from '../../../Shared/Select';

const FormEmployee = ({ employees, employee, changeValue }) => {
  const roles = ['DEV', 'QA', 'PM', 'TL'];

  return (
    <div className={styles.employees}>
      <div>
        <Select
          selectedValue={employee?.employee}
          options={employees}
          changeValue={(value) => changeValue('employee', value, true)}
          field="lastName"
          label="Employees"
        />
        {/* <label>Employee: </label>
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
        </select> */}
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
        <label>Rate: </label>
        <input
          type="number"
          name="rate"
          value={employee ? employee.rate : undefined}
          onChange={(e) => changeValue('rate', e.target.value, true)}
        />
      </div>
    </div>
  );
};

export default FormEmployee;
