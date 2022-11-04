import { useEffect, useState } from 'react';
import Table from './adminTable';
import styles from './admins.module.css';

function Admins() {
  const [admins, saveAdmins] = useState([]);

  useEffect(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/admins`);
      const data = await response.json();
      saveAdmins(data.data);
    } catch (error) {
      alert(error);
    }
  }, []);

  const deleteAdmin = (id) => {
    saveAdmins([...admins.filter((newListItem) => newListItem._id !== id)]);
  };

  return (
    <div className={styles.container}>
      <div className={styles.adminHeader}>
        <h2>Admin</h2>
        <a href={`admin-form`}>+</a>
      </div>
      <Table list={admins} saveAdmins={saveAdmins} deleteItem={deleteAdmin} />
    </div>
  );
}

export default Admins;
