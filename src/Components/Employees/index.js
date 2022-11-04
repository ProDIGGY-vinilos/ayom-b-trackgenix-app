import { useEffect, useState } from 'react';
import styles from './employees.module.css';
import Button from './Button';
import Employee from './Employee';

function Employees() {
  // const [showModal, setShowModal] = useState(false);
  const [employees, setEmployees] = useState([]);

  const deleteItem = (id) => {
    setEmployees(employees.filter((employee) => employee._id !== id));
  };

  useEffect(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/employees`);
      const data = await response.json();
      setEmployees(data.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <section className={styles.container}>
      <div className={styles.title}>
        <h2>Employees</h2>
        <Button color="green" text={'Add'} href={'/employee-form'} />
      </div>
      {employees.map((employee) => {
        return (
          <>
            <Employee key={employee._id} employee={employee} onDeleteItem={deleteItem} />
          </>
        );
      })}
    </section>
  );
}
export default Employees;
