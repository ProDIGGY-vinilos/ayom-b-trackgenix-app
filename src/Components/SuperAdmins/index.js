import { useEffect, useState } from 'react';
import styles from './super-admins.module.css';
import MessageModal from '../Shared/Modal/MessageModal';
import Table from '../Shared/Table';
import Button from '../Shared/Button/Button';
import { useSelector, useDispatch } from 'react-redux';
import { getSuperAdmin, deleteSuperAdmin } from '../../redux/superAdmins/thunks';

const SuperAdmins = () => {
  const [typeModal, setTypeModal] = useState();
  const [textModal, setTextModal] = useState();
  const [showModal, setShowModal] = useState(false);

  const { list: superAdminList, isLoading, error } = useSelector((state) => state.superAdmins);
  const dispatch = useDispatch();

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    dispatch(getSuperAdmin());
  }, []);

  useEffect(() => {
    openModalOnError(error);
  }, [error]);

  const onDeleteSuperAdmin = (id) => {
    dispatch(deleteSuperAdmin(id));
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
