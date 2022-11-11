import { useEffect, useState } from 'react';
import styles from './employees.module.css';
import MessageModal from '../Shared/Modal/MessageModal';
import { Link } from 'react-router-dom';
import Table from '../Shared/Table';

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [typeModal, setTypeModal] = useState();
  const [textModal, setTextModal] = useState();
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const deleteItem = (id) => {
    setEmployees(employees.filter((employee) => employee._id !== id));
    setTypeModal('Success');
    setTextModal('The employee was successfully removed');
    openModal();
  };

  const deleteEmployee = async (id) => {
    await fetch(`${process.env.REACT_APP_API_URL}/employees/${id}`, { method: 'DELETE' });
    deleteItem(id);
  };

  useEffect(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/employees`);
      const data = await response.json();
      setEmployees(data.data);
    } catch (error) {
      setTypeModal('Error');
      setTextModal(error);
      openModal();
      return;
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
      <MessageModal
        type={typeModal}
        isOpen={showModal}
        message={textModal}
        handleClose={closeModal}
        goBack={'/employees'}
      />
    </section>
  );
};
export default Employees;
