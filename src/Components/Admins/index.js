import { useEffect, useState } from 'react';
import styles from 'Components/Admins/admins.module.css';
import MessageModal from 'Components/Shared/Modal/MessageModal';
import Table from 'Components/Shared/Table';
import Button from 'Components/Shared/Button/Button';
import { useSelector, useDispatch } from 'react-redux';
import { getAdmins, deleteAdmin } from 'redux/admins/thunks';

const Admins = () => {
  const { list: adminList, isLoading, error } = useSelector((state) => state.admins);
  const dispatch = useDispatch();
  const token = sessionStorage.getItem('token');

  const [typeModal, setTypeModal] = useState('');
  const [textModal, setTextModal] = useState('');
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    dispatch(getAdmins(token));
  }, []);

  useEffect(() => {
    openModalOnError(error);
  }, [error]);

  const removeAdmin = (id) => {
    dispatch(deleteAdmin(id, token));
    if (error) {
      openModalOnError(error);
    } else {
      setTypeModal('Success');
      setTextModal('The administrator was successfully removed');
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

  const openModalOnError = (error) => {
    if (error) {
      setTypeModal('Error');
      setTextModal(error);
      openModal();
    }
  };

  return (
    <section className={styles.container}>
      <h2>Admin</h2>
      <Table data={adminList} columns={columns} deleteItem={removeAdmin} edit="/admin/admin-form" />
      <Button href={`/admin/admin-form`} style="roundedPrimary" disabled={false} text="+" />
      <MessageModal
        type={typeModal}
        isOpen={showModal}
        message={textModal}
        handleClose={closeModal}
      />
    </section>
  );
};

export default Admins;
