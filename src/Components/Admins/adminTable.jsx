import React from 'react';
import RowAdmin from './adminRow';
import styles from './admins.module.css';

const AdminTable = ({ list, deleteItem }) => {
  return (
    <div className={styles.list}>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>LastName</th>
            <th>Email</th>
            <th>Password</th>
            <th>Action</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {list === undefined || list.length === 0 ? (
            <td>There are no admin yet!</td>
          ) : (
            list.map((admins) => {
              return <RowAdmin key={admins._id} listAdmin={admins} deleteAdmin={deleteItem} />;
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTable;
