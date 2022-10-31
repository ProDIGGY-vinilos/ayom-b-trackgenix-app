import React from 'react';
import styles from '../super-admins.module.css';

const ListSuperAdmin = ({ sAdmin, onDeleteSuperAdmin }) => {
  const deleteSuperAdmin = async (id) => {
    await fetch(`${process.env.REACT_APP_API_URL}superAdmins/${id}`, {
      method: 'DELETE'
    });
    onDeleteSuperAdmin(sAdmin._id);
  };

  return (
    <tr key={sAdmin._id}>
      <td>{sAdmin._id}</td>
      <td className={styles.info}>{sAdmin.name}</td>
      <td className={styles.info}>{sAdmin.lastName}</td>
      <td className={styles.info}>{sAdmin.email}</td>
      <td className={styles.info}>{sAdmin.password}</td>
      <td className={styles.btn}>
        <button>edit</button>
      </td>
      <td className={styles.btn}>
        <button onClick={() => deleteSuperAdmin(sAdmin._id)}>Delete</button>
      </td>
      <td className={styles.btn}>
        <button>create</button>
      </td>
    </tr>
  );
};

export default ListSuperAdmin;
