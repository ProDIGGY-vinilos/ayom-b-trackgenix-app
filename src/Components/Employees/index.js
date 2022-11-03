import { useEffect, useState } from 'react';
import styles from './employees.module.css';
import Button from './Button';
import Employee from './Employee';
import Modal from './modal/modal';

function Employees() {
  const [showModal, setShowModal] = useState(false);
  const [employees, setEmployees] = useState([]);

  useEffect(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/employees`);
      const data = await response.json();
      setEmployees(data.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const deleteEmployee = async (id) => {
    await fetch(`${process.env.REACT_APP_API_URL}/employees/${id}`, { method: 'DELETE' });
    setEmployees(employees.filter((e) => e._id !== id));
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const openModal = () => {
    setShowModal(true);
  };

  return (
    <section className={styles.container}>
      <div className={styles.title}>
        <h2>Employees</h2>
        <Button color="green" text={'Add'} href={'/employee-form'} />
      </div>
      {employees.map((employee) => (
        <>
          <Employee key={employee._id} employee={employee} onClickDelete={openModal} />
          <Modal
            openModal={showModal}
            closeModal={closeModal}
            deleteAction={deleteEmployee}
            id={employee._id}
            warningText={`Are you sure you want to remove Employee: ${employee.name}`}
            title={'DELETE EMPLOYEE'}
          />
        </>
      ))}
    </section>
  );
}
export default Employees;
