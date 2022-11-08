import { useEffect, useState } from 'react';
import styles from './super-admins.module.css';
import ListSuperAdmin from './ListSuperAdmins/index';
import PrimaryBtn from '../Shared/Button/primaryBtn';

function SuperAdmins() {
  const [superAdmins, setSuperAdmins] = useState([]);

  useEffect(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/superAdmins`);
      const data = await response.json();
      setSuperAdmins(data.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const onDeleteSuperAdmin = (id) => {
    setSuperAdmins([...superAdmins.filter((sAdmin) => sAdmin._id !== id)]);
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
      <div className={styles.addBtn}>
        <PrimaryBtn href={'/super-admin-form'} style="rounded" disabled={false} text="+" />
      </div>
    </section>
  );
}

export default SuperAdmins;
