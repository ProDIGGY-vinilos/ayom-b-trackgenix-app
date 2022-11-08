import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Table from './adminTable';
import styles from './admins.module.css';
import Modal from '../Shared/Modal';

function Admins() {
  const [admins, saveAdmins] = useState([]);

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
      const response = await fetch(`${process.env.REACT_APP_API_URL}/admins`);
      const data = await response.json();
      saveAdmins(data.data);
    } catch (error) {
      setTypeModal('Error');
      setTextModal(error);
      openModal();
      return;
    }
  }, []);

  const deleteAdmin = (id) => {
    saveAdmins([...admins.filter((newListItem) => newListItem._id !== id)]);
    setTypeModal('Success');
    setTextModal('The administrator was successfully removed');
    openModal();
  };

  return (
    <div className={styles.container}>
      <div className={styles.adminHeader}>
        <h2>Admin</h2>
        <Link to="/admin-form">+</Link>
      </div>
      <Table list={admins} saveAdmins={saveAdmins} deleteItem={deleteAdmin} />
      <Modal
        type={typeModal}
        isOpen={showModal}
        message={textModal}
        handleClose={closeModal}
        goBack={'/admins'}
      />
    </div>
  );
}

export default Admins;
