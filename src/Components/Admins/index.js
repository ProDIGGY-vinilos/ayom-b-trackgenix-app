import { useEffect, useState } from 'react';
import styles from './admins.module.css';
import MessageModal from '../Shared/Modal/MessageModal';
import Table from '../Shared/Table';
import Button from '../Shared/Button/Button';

const Admins = () => {
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

  return (
    <section className={styles.container}>
      <h2>Admin</h2>
      <Table data={admins} columns={columns} deleteItem={removeAdmin} edit="/admin-form" />
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
