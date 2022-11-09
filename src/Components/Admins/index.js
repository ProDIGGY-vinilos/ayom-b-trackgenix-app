import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './admins.module.css';
import Table from '../Shared/Table';

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

  const removeAdmin = async (id) => {
    await fetch(`${process.env.REACT_APP_API_URL}/admins/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json'
      }
    });
    deleteAdmin(id);
    alert('The administrator was successfully removed');
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
      <Link to="/admin-form" className={styles.newAdmin}>
        +
      </Link>
    </section>
  );
}

export default Admins;
