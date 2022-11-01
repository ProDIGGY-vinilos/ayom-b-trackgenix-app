import { useEffect, useState } from 'react';
import styles from './employees.module.css';
import Button from './Button';
import Employee from './Employee';
import FormAddEmployee from './FormAddEmployee';

function Employees() {
  const [employees, saveEmployees] = useState([]);
  const [showAddEmployee, setShowAddEmployee] = useState(false);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/employees`)
      .then((response) => response.json())
      .then((response) => {
        saveEmployees(response.data);
      });
  }, []);

  const deleteEmployee = async (id) => {
    await fetch(`${process.env.REACT_APP_API_URL}/employees/${id}`, { method: 'DELETE' });
    saveEmployees(employees.filter((e) => e._id != id));
  };

  return (
    <section className={styles.container}>
      <h2>Employees</h2>
      <Button
        onClick={() => setShowAddEmployee(!showAddEmployee)}
        color="green"
        text={!showAddEmployee ? 'Add' : 'Close'}
      />
      {showAddEmployee && <FormAddEmployee />}
      {employees.map((employee) => (
        <Employee key={employee._id} employee={employee} onClickDelete={deleteEmployee} />
      ))}
    </section>
  );
}
export default Employees;
