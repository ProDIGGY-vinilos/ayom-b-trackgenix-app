import React from 'react';
import ListAdmin from './listItem';
import styles from './admins.module.css';

const List = ({ list, deleteItem }) => {
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
          {list.map((admins) => {
            return <ListAdmin key={admins._id} listAdmin={admins} deleteAdmin={deleteItem} />;
          })}
        </tbody>
      </table>
    </div>
  );
};

export default List;
