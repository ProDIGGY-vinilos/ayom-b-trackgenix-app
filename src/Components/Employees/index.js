import { useEffect, useState } from 'react';
import styles from './employees.module.css';
import Button from './Button';
import Employee from './Employee';
import Modal from './modal/modal';

function Employees() {
  const [showModal, setShowModal] = useState(false);
  const [employees, saveEmployees] = useState([]);

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
