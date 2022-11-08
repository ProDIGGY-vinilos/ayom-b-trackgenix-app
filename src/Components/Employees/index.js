import { useEffect, useState } from 'react';
import styles from './employees.module.css';
import Button from './Button';
import Employee from './Employee';
import Modal from '../Shared/Modal';

function Employees() {
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

  return (
    <section className={styles.container}>
      <div className={styles.title}>
        <h2>Employees</h2>
        <Button color="green" text={'Add'} href={'/employee-form'} />
      </div>
      <Modal
        type={typeModal}
        isOpen={showModal}
        message={textModal}
        handleClose={closeModal}
        goBack={'/employees'}
      />
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
