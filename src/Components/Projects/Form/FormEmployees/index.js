import React from 'react';
import styles from './formemployee.module.css';

const FormEmployee = ({
  employees,
  eachEmployee,
  changeEmployeeValue,
  changeRoleValue,
  changeRateValue
}) => {
  const roles = ['DEV', 'QA', 'PM', 'TL'];

  return (
    <div className={styles.employees}>
      <div>
        <label>Employee: </label>
        {eachEmployee ? (
          <select onChange={(e) => changeEmployeeValue(e.target.value)}>
            {employees.map((singleEmployee) => {
              if (singleEmployee._id === eachEmployee.employee) {
                return (
                  <option value={singleEmployee._id} key={singleEmployee._id} selected>
                    {singleEmployee.lastName}
                  </option>
                );
              } else {
                return (
                  <option value={singleEmployee._id} key={singleEmployee._id}>
                    {singleEmployee.lastName}
                  </option>
                );
              }
            })}
          </select>
        ) : (
          <select onChange={(e) => changeEmployeeValue(e.target.value)}>
            {employees.map((singleEmployee) => {
              return (
                <option value={singleEmployee._id} key={singleEmployee._id}>
                  {singleEmployee.lastName}
                </option>
              );
            })}
          </select>
        )}
      </div>
      <div>
        <label>Role: </label>
        {eachEmployee ? (
          <select onChange={(e) => changeRoleValue(e.target.value)}>
            {roles.map((role) => {
              if (role === eachEmployee.role) {
                return (
                  <option value={role} selected>
                    {role}
                  </option>
                );
              } else {
                return <option value={role}>{role}</option>;
              }
            })}
          </select>
        ) : (
          <select
            defaultValue={eachEmployee && eachEmployee.role}
            onChange={(e) => changeRoleValue(e.target.value)}
          >
            <option value="" className={styles.displayNone} selected></option>
            {roles.map((role) => {
              return (
                <option value={role} key={role.index}>
                  {role}
                </option>
              );
            })}
          </select>
        )}
      </div>
      <div>
        <label>Rate: </label>
        <input
          type="number"
          name="rate"
          defaultValue={eachEmployee ? eachEmployee.rate : ''}
          onChange={changeRateValue}
        />
      </div>
    </div>
  );
};

export default FormEmployee;
