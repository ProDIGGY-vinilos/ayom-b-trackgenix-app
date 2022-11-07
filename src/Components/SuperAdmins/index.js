import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './super-admins.module.css';
import Table from '../Shared/Table';
/* import ListSuperAdmin from './ListSuperAdmins/index'; */

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

  const deleteSuperAdmin = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/superAdmins/${id}`, {
        method: 'DELETE'
      });
      if (response.status === 204) {
        alert(`Super Admin with id: ${id} has been deleted`);
        onDeleteSuperAdmin(id);
      }
    } catch (error) {
      alert(error.message);
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
      {/* <Table list={admins} saveAdmins={saveAdmins} deleteItem={deleteAdmin} /> */}
    </div>
  );

  /* return (
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
    </section>
  ); */
}

export default SuperAdmins;
