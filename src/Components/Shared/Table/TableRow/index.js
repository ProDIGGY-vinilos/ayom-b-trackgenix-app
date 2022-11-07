import React from 'react';
import Modal from '../../../Projects/Modal';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const TableRow = ({ item, columns, deleteItem, edit }) => {
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
                <td>
                  <button>
                    <Link to={`${edit}/${item._id}`}>Edit</Link>
                  </button>
                  <button onClick={openModal}>Delete</button>
                </td>
              </>
            );
          }

          if (columnItem.type === 'date') {
            return <td key={index}>{item[columnItem.value].substring(0, 10)}</td>;
          }

          if (columnItem.subValue) {
            return <td key={index}>{item[columnItem.value][columnItem.subValue]}</td>;
          }

          if (columnItem.array) {
            console.log(item[columnItem.value]);
            console.log(item[columnItem.value][0][columnItem.array][columnItem.arrayValue]);

            return (
              <td>
                <p>
                  Name: {item[columnItem.value][0][columnItem.array][columnItem.nameValue]}{' '}
                  {item[columnItem.value][0][columnItem.array][columnItem.lastNameValue]}
                </p>
                <p>Role: {item[columnItem.value][0][columnItem.roleValue]}</p>
                <p>Rate: {item[columnItem.value][0][columnItem.rateValue]}</p>
              </td>
            );
          }

          return <td key={index}>{item[columnItem.value]}</td>;
        })}
      </tr>
      <Modal
        show={showModal}
        closeModal={closeModal}
        onDelete={deleteItem}
        id={item._id}
        title={'Delete Project?'}
        text={`Are you sure you want to delete this?`}
      />
    </>
  );
};

export default TableRow;
