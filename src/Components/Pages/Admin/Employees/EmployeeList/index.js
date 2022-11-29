import { useEffect, useState } from 'react';
import styles from 'Components/Employees/employees.module.css';
import MessageModal from 'Components/Shared/Modal/MessageModal';
import Table from 'Components/Shared/Table';
import { useSelector, useDispatch } from 'react-redux';
import { getEmployees, deleteEmployee } from 'redux/employees/thunks';
import { clearError } from 'redux/employees/actions';

const Employees = () => {
  const [typeModal, setTypeModal] = useState('');
  const [textModal, setTextModal] = useState('');
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const { list: employeesList, isLoading, error } = useSelector((state) => state.employees);
  const token = sessionStorage.getItem('token');

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
    dispatch(deleteEmployee(id, token));
    deleteItem(id);
  };

  useEffect(() => {
    dispatch(clearError());
    if (!employeesList.length || employeesList.length === 1) {
      dispatch(getEmployees(token));
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
      {employeesList.length ? (
        <Table
          data={employeesList}
          columns={columns}
          deleteItem={onDeleteEmployee}
          edit="/admin/employee-form"
        />
      ) : (
        <h2>No Employees</h2>
      )}
      <MessageModal
        type={typeModal}
        isOpen={showModal}
        message={textModal}
        handleClose={closeModal}
      />
    </section>
  );
};
export default Employees;
