import React from 'react';
import TableHeader from './TableHeader';
import TableRow from './TableRow';

const Table = ({ columns, data, deleteItem }) => {
  return (
    <table>
      <thead>
        <tr>
          {columns.map((item, index) => {
            return <TableHeader key={index} item={item} />;
          })}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => {
          return <TableRow key={index} item={item} columns={columns} deleteItem={deleteItem} />;
        })}
      </tbody>
    </table>
  );
};

export default Table;
