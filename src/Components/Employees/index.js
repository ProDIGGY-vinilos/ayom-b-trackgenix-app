import { useEffect, useState } from 'react';
import styles from './employees.module.css';
import MessageModal from '../Shared/Modal/MessageModal';
import Table from '../Shared/Table';
import Button from '../Shared/Button/Button';
import { useSelector, useDispatch } from 'react-redux';
import { getEmployees, deleteEmployee } from '../../redux/employees/thunks';
import { clearError } from '../../redux/employees/actions';

const Employees = () => {
  const [typeModal, setTypeModal] = useState('');
  const [textModal, setTextModal] = useState('');
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const { list: employeesList, isLoading, error } = useSelector((state) => state.employees);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    dispatch(clearError());
  };

  const deleteItem = () => {
    setTypeModal('Success');
    setTextModal('The employee was successfully removed');
    openModal();
  };

  const onDeleteEmployee = async (id) => {
    dispatch(deleteEmployee(id));
    deleteItem(id);
  };

  useEffect(() => {
    dispatch(clearError());
    if (!employeesList.length || employeesList.length === 1) {
      console.log(employeesList);
      dispatch(getEmployees());
    }
  }, []);

  useEffect(() => {
    if (error) {
      openModalOnError(error);
    }
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
        deleteItem={onDeleteEmployee}
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
