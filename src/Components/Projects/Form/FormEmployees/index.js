import React from 'react';
import styles from './formemployee.module.css';

const FormEmployee = ({
  eachEmployee,
  changeEmployeeValue,
  changeRoleValue,
  changeRateValue
  /* deleteEmployee */
}) => {
  return (
    <div className={styles.employees}>
      <div>
        <label>Employee: </label>
        <input
          type="text"
          name="employee"
          defaultValue={eachEmployee ? eachEmployee.employee : ''}
          onChange={changeEmployeeValue}
        />
      </div>
      <div>
        <label>Role: </label>
        <input
          type="text"
          name="role"
          defaultValue={eachEmployee ? eachEmployee.role : ''}
          onChange={changeRoleValue}
        />
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
      {/* <button onClick={deleteEmployee}>Delete Employee</button> */}
    </div>
  );
};

export default FormEmployee;
