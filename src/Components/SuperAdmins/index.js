import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './super-admins.module.css';
import MessageModal from '../Shared/Modal/MessageModal';
import Table from '../Shared/Table';

function SuperAdmins() {
  const [superAdmins, setSuperAdmins] = useState([]);
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
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/superAdmins`);
      const data = await response.json();
      setSuperAdmins(data.data);
    } catch (error) {
      setTypeModal('Error');
      setTextModal(error);
      openModal();
      return;
    }
  }, []);

  const onDeleteSuperAdmin = (id) => {
    setSuperAdmins([...superAdmins.filter((sAdmin) => sAdmin._id !== id)]);
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

  return (
    <div className={styles.container}>
      <h2>Super Admin</h2>
      <Table
        data={superAdmins}
        columns={columns}
        deleteItem={deleteSuperAdmin}
        edit="/super-admin-form"
      />
      <Link className={styles.newSuperAdmin} to="/super-admin-form">
        +
      </Link>
      <MessageModal
        type={typeModal}
        isOpen={showModal}
        message={textModal}
        handleClose={closeModal}
      />
    </div>
  );
}

export default SuperAdmins;
