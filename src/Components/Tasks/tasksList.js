import React from 'react';
import ListTask from './listItem';
import styles from './tasks.module.css';

const List = ({ list, deleteItem }) => {
  return (
    <div className={styles.container}>
      <table className={styles.listTable}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {list.map((tasks) => {
            return <ListTask key={tasks._id} listTask={tasks} deleteTask={deleteItem} />;
          })}
        </tbody>
      </table>
    </div>
  );
};

export default List;
