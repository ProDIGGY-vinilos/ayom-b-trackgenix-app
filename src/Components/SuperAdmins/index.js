import { useEffect, useState } from 'react';
import styles from 'Components/SuperAdmins/super-admins.module.css';
import MessageModal from 'Components/Shared/Modal/MessageModal';
import Table from 'Components/Shared/Table';
import Button from 'Components/Shared/Button/Button';
import { useSelector, useDispatch } from 'react-redux';
import { getSuperAdmins, deleteSuperAdmin } from 'redux/superAdmins/thunks';

const SuperAdmins = () => {
  const [typeModal, setTypeModal] = useState();
  const [textModal, setTextModal] = useState();
  const [showModal, setShowModal] = useState(false);
  const token = sessionStorage.getItem('token');

  const { list: superAdminList, isLoading, error } = useSelector((state) => state.superAdmins);
  const dispatch = useDispatch();

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    dispatch(getSuperAdmins(token));
  }, []);

  useEffect(() => {
    openModalOnError(error);
  }, [error]);

  const onDeleteSuperAdmin = (id) => {
    dispatch(deleteSuperAdmin(id, token));
    if (error) {
      openModalOnError(error);
    } else {
      setTypeModal('Success');
      setTextModal('The super administrator was successfully removed');
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

  return (
    <div className={styles.container}>
      <h2>Super Admin</h2>
      {isLoading ? (
        <h3>Loading.. </h3>
      ) : (
        <>
          <Table
            data={superAdminList}
            columns={columns}
            deleteItem={onDeleteSuperAdmin}
            edit="/admin/super-admin-form"
          />
          <Button href="/admin/super-admin-form" style="roundedPrimary" disabled={false} text="+" />
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
