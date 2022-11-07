import { useEffect, useState } from 'react';
import styles from './employees.module.css';
import { Link } from 'react-router-dom';
import Table from '../Shared/Table';
/* import Button from './Button';
import Employee from './Employee'; */

function Employees() {
  // const [showModal, setShowModal] = useState(false);
  const [employees, setEmployees] = useState([]);

  const deleteItem = (id) => {
    setEmployees(employees.filter((employee) => employee._id !== id));
  };

  const deleteEmployee = async (id) => {
    await fetch(`${process.env.REACT_APP_API_URL}/employees/${id}`, { method: 'DELETE' });
    deleteItem(id);
    alert(`Employee ${id} deleted`);
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

  const columns = [
    { heading: 'Id', value: '_id' },
    { heading: 'Name', value: 'name' },
    { heading: 'Last Name', value: 'lastName' },
    { heading: 'Email', value: 'email' },
    { heading: 'Password', value: 'password' },
    { heading: 'Actions' }
  ];

  return (
    <section className={styles.container}>
      <h2>Employee</h2>
      <Table data={employees} columns={columns} deleteItem={deleteEmployee} edit="/employee-form" />
      <Link to="/employee-form" className={styles.newEmployee}>
        +
      </Link>
    </section>
  );

  /* return (
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
  ); */
}
export default Employees;
