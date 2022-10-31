import styles from './super-admins.module.css';
import { useEffect, useState } from 'react';
// import DeleteButton from './Delete Button/deleteButton';
import ListSuperAdmin from './ListSuperAdmins/listSuperAdmins';

function SuperAdmins() {
  const [superAdmins, saveSuperAdmins] = useState([]);

  useEffect(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}superAdmins`);
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
      <table>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>LastName</th>
          <th>Email</th>
          <th>Password</th>
          <th className={styles.btn}>b</th>
          <th className={styles.btn}>b</th>
          <th className={styles.btn}>b</th>
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
    </section>
  );
}

export default SuperAdmins;
