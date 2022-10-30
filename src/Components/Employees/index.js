import { useEffect, useState } from 'react';
import styles from './employees.module.css';
import Button from './Button';
// import Employee from './Employee';

function Employees() {
  const [employees, saveEmployees] = useState([]);

  useEffect(() => {
    // eslint-disable-next-line no-undef
    fetch(`${process.env.REACT_APP_API_URL}/employees`)
      .then((response) => response.json())
      .then((response) => {
        saveEmployees(response.data);
      });
  }, []);

  const onClick = () => {
    console.log('click');
  };

  return (
    <section className={styles.container}>
      <h2>Employees</h2>
      <Button color="green" text="Add" onClick={onClick} />
      <Button color="yellor" text="Edit" />
      <Button color="red" text="Delete" />

      <table>
        <tr>
          <th>Name</th>
          <th>Last Name</th>
          <th>Phone</th>
          <th>Email</th>
        </tr>
        {employees.map((employee) => {
          return (
            <tr key={employee.id}>
              <td key={employee._id}>{employee.name}</td>
              <td key={employee._id}>{employee.lastName}</td>
              <td key={employee._id}>{employee.phone}</td>
              <td key={employee._id}>{employee._id}</td>
            </tr>
          );
        })}
      </table>
    </section>
  );
}

export default Employees;
