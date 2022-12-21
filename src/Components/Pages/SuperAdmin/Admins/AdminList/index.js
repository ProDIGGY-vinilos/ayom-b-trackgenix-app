import { useEffect, useState } from 'react';
import styles from 'Components/Admins/admins.module.css';
import MessageModal from 'Components/Shared/Modal/MessageModal';
import Table from 'Components/Shared/Table';
import Button from 'Components/Shared/Button/Button';
import { useSelector, useDispatch } from 'react-redux';
import { getAdmins, deleteAdmin } from 'redux/admins/thunks';
import { clearError } from 'redux/admins/actions';
import LoadingModal from 'Components/Shared/Loading';

const Admins = () => {
  const { list: adminList, isLoading, error, message } = useSelector((state) => state.admins);
  const dispatch = useDispatch();
  const token = sessionStorage.getItem('token');

  const [typeModal, setTypeModal] = useState('');
  const [textModal, setTextModal] = useState('');
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
    dispatch(clearError);
  };

  const closeModal = () => {
    setShowModal(false);
    dispatch(clearError);
  };

  useEffect(() => {
    dispatch(clearError);
    dispatch(getAdmins(token));
  }, []);

  useEffect(() => {
    if (error) {
      setTypeModal('Error');
      setTextModal(error);
      openModal();
    } else if (message) {
      setTypeModal('Success');
      setTextModal(message);
      openModal();
    }
  }, [error, message]);

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
    { heading: 'Name', value: 'name' },
    { heading: 'Last Name', value: 'lastName' },
    { heading: 'Email', value: 'email' },
    { heading: 'Actions' }
  ];

  if (isLoading) {
    return <LoadingModal />;
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
      <Table
        data={adminList}
        columns={columns}
        deleteItem={removeAdmin}
        edit="/super-admin/admin-form"
      />
      <Button href={`/super-admin/admin-form`} style="roundedPrimary" disabled={false} text="+" />
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
