import React from 'react';
import TableRow from 'Components/Shared/Table/TableRow';
import styles from 'Components/Shared/Table/table.module.css';

const Table = ({ columns, data, deleteItem, edit }) => {
  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead className={styles.tableHeader}>
          <tr>
            {columns.map((item, index) => {
              return (
                <th className={styles.tableTitles} key={index}>
                  {item.heading}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className={styles.tableRow}>
          {data.map((item, index) => {
            return (
              <TableRow
                key={index}
                item={item}
                columns={columns}
                deleteItem={deleteItem}
                edit={edit}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
