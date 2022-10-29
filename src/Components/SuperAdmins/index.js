import styles from './super-admins.module.css';
import { useEffect, useState } from 'react';

function SuperAdmins() {
  const [SuperAdmins, saveSuperAdmins] = useState([]);

  useEffect(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}api/superAdmins`);
      const data = await response.json();
      saveSuperAdmins(data.data);
    } catch (error) {
      console.error(error);
    }
  }, []);
  return (
    <section className={styles.container}>
      <h2>SuperAdmins</h2>
      <div id="probando">
        <table>
          <tr>
            <th>Name</th>
            <th>Last name</th>
            <th>email</th>
          </tr>
          {SuperAdmins.map((SuperAdmin) => {
            return (
              <tr key={SuperAdmin._id}>
                <td>{SuperAdmin.name}</td>
                <td>{SuperAdmin.lastName}</td>
                <td>{SuperAdmin.email}</td>
              </tr>
            );
          })}
        </table>
      </div>
    </section>
  );
}

export default SuperAdmins;
