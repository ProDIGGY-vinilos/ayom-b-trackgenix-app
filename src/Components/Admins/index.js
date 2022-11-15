import { useEffect, useState } from 'react';
import styles from './admins.module.css';
import MessageModal from '../Shared/Modal/MessageModal';
import Table from '../Shared/Table';
import Button from '../Shared/Button/Button';
import { useSelector, useDispatch } from 'react-redux';
import { getAdmins } from '../../redux/admins/thunks';

const Admins = () => {
  const { list: adminList, isLoading, error } = useSelector((state) => state.admins);
  const dispatch = useDispatch();

  const [typeModal, setTypeModal] = useState();
  const [textModal, setTextModal] = useState();
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(async () => {
    dispatch(getAdmins());
  }, []);

  useEffect(async () => {
    openModalOnError(error);
  }, [error]);

  const deleteAdmin = () => {
    dispatch(getAdmins());
    setTypeModal('Success');
    setTextModal('The administrator was successfully removed');
    openModal();
  };

  const removeAdmin = async (id) => {
    await fetch(`${process.env.REACT_APP_API_URL}/admins/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json'
      }
    });
    deleteAdmin(id);
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
      <Table data={adminList} columns={columns} deleteItem={removeAdmin} edit="/admin-form" />
      <Button href={`/admin-form`} style="roundedPrimary" disabled={false} text="+" />
      <MessageModal
        type={typeModal}
        isOpen={showModal}
        message={textModal}
        handleClose={closeModal}
        goBack={'/admins'}
      />
    </section>
  );
};

export default Admins;
