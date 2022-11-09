import { useEffect, useState } from 'react';
import styles from './employees.module.css';
import { Link } from 'react-router-dom';
import Table from '../Shared/Table';

const Employees = () => {
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
      alert(error);
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
};
export default Employees;
