import { useEffect, useState } from 'react';
import styles from './employees.module.css';
import MessageModal from '../Shared/Modal/MessageModal';
import Table from '../Shared/Table';
import Button from '../Shared/Button/Button';
import { useSelector, useDispatch } from 'react-redux';
import getEmployees from '../../redux/employees/thunks';

const Employees = () => {
  const [typeModal, setTypeModal] = useState();
  const [textModal, setTextModal] = useState();
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const { list: employeesList, isLoading, error } = useSelector((state) => state.employees);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const deleteItem = () => {
    dispatch(getEmployees());
    setTypeModal('Success');
    setTextModal('The employee was successfully removed');
    openModal();
  };

  const deleteEmployee = async (id) => {
    await fetch(`${process.env.REACT_APP_API_URL}/employees/${id}`, { method: 'DELETE' });
    deleteItem(id);
  };

  useEffect(async () => {
    dispatch(getEmployees());
  }, []);

  useEffect(async () => {
    openModalOnError(error);
  }, [error]);

  const openModalOnError = (error) => {
    if (error) {
      setTypeModal('Error');
      setTextModal(error);
      openModal();
    }
  };

  const columns = [
    { heading: 'Id', value: '_id' },
    { heading: 'Name', value: 'name' },
    { heading: 'Last Name', value: 'lastName' },
    { heading: 'Email', value: 'email' },
    { heading: 'Password', value: 'password' },
    { heading: 'Actions' }
  ];

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  return (
    <section className={styles.container}>
      <h2>Employee</h2>
      <Table
        data={employeesList}
        columns={columns}
        deleteItem={deleteEmployee}
        edit="/employee-form"
      />
      <Button href="/employee-form" style="roundedPrimary" disabled={false} text="+" />
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
