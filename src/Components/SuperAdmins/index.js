import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './super-admins.module.css';
import ListSuperAdmin from './ListSuperAdmins/index';
import Modal from '../Shared/Modal';

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
    setTypeModal('DELETE');
    setTextModal('The super administrator was successfully removed');
    openModal();
  };

  return (
    <section className={styles.container}>
      <h2>Super Admins</h2>
      <table>
        <tbody>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>LastName</th>
            <th>Email</th>
            <th>Password</th>
            <th className={styles.btn}>Actions</th>
            <th className={styles.btn}>Actions</th>
          </tr>
          {superAdmins.map((superAdmin) => {
            return (
              <ListSuperAdmin
                key={superAdmin._id}
                sAdmin={superAdmin}
                onDeleteSuperAdmin={onDeleteSuperAdmin}
              />
            );
          })}
        </tbody>
      </table>
      <Link to="/super-admin-form">
        <button>+</button>
      </Link>
      <Modal
        type={typeModal}
        isOpen={showModal}
        message={textModal}
        handleClose={closeModal}
        goBack={'/super-admins'}
      />
    </section>
  );
}

export default SuperAdmins;
