import styles from './super-admins.module.css';
import { useEffect, useState } from 'react';
import ListSuperAdmin from './ListSuperAdmins/index';

function SuperAdmins() {
  const [superAdmins, saveSuperAdmins] = useState([]);

  useEffect(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/superAdmins`);
      const data = await response.json();
      saveSuperAdmins(data.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const onDeleteSuperAdmin = (id) => {
    saveSuperAdmins([...superAdmins.filter((sAdmin) => sAdmin._id !== id)]);
  };

  return (
    <section className={styles.container}>
      <h2>Super Admins</h2>
      <table>
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
      </table>
      <a href="/super-admin-form">
        <button>+</button>
      </a>
    </section>
  );
}

export default SuperAdmins;
