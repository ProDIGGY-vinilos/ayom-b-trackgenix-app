import { useEffect, useState } from 'react';
import styles from './super-admins.module.css';
import MessageModal from '../Shared/Modal/MessageModal';
import Table from '../Shared/Table';
import Button from '../Shared/Button/Button';
import { useSelector, useDispatch } from 'react-redux';
import getSuperAdmins from '../../redux/superAdmins/thunks';

const SuperAdmins = () => {
  const [typeModal, setTypeModal] = useState();
  const [textModal, setTextModal] = useState();
  const [showModal, setShowModal] = useState(false);

  const { list: superAdminsList, isLoading, error } = useSelector((state) => state.superAdmins);
  const dispatch = useDispatch();

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(async () => {
    dispatch(getSuperAdmins());
  }, []);

  const onDeleteSuperAdmin = () => {
    dispatch(getSuperAdmins());
    setTypeModal('Success');
    setTextModal('The super administrator was successfully removed');
    openModal();
  };

  const deleteSuperAdmin = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/superAdmins/${id}`, {
        method: 'DELETE'
      });
      if (response.status === 204) {
        onDeleteSuperAdmin(id);
      }
    } catch (error) {
      setTypeModal('Error');
      setTextModal(error);
      openModal();
      return;
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
  if (error) {
    return (
      <section className={styles.container}>
        <h2>SuperAdmins</h2>
        <h3>{error}</h3>
      </section>
    );
  }

  return (
    <div className={styles.container}>
      <h2>Super Admin</h2>
      {isLoading ? (
        <h3>Loading.. </h3>
      ) : (
        <>
          <Table
            data={superAdminsList}
            columns={columns}
            deleteItem={deleteSuperAdmin}
            edit="/super-admin-form"
          />
          <Button href="/super-admin-form" style="roundedPrimary" disabled={false} text="+" />
          <MessageModal
            type={typeModal}
            isOpen={showModal}
            message={textModal}
            handleClose={closeModal}
          />
        </>
      )}
      ;
    </div>
  );
};

export default SuperAdmins;
