import React from 'react';
import Modal from '../../../Projects/Modal';
import { useState } from 'react';

const TableRow = ({ item, columns, deleteItem }) => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <tr>
        {columns.map((columnItem, index) => {
          if (columnItem.heading === 'Actions') {
            return (
              <>
                <button>Edit</button>
                <button onClick={openModal}>Delete</button>
              </>
            );
          }

          if (columnItem.value.includes('Date')) {
            const dateItem = columnItem.value;
            return <td key={index}>{item[dateItem].substring(0, 10)}</td>;
          }

          return <td key={index}>{item[`${columnItem.value}`]}</td>;
        })}
      </tr>
      <Modal
        show={showModal}
        closeModal={closeModal}
        onDelete={deleteItem}
        id={item._id}
        title={'Delete Project?'}
        text={`Are you sure you want to delete project "${item.name}"?`}
      />
    </>
  );
};

export default TableRow;
