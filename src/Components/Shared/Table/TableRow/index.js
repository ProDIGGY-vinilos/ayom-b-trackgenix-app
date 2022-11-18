import React from 'react';
import Modal from 'Components/Shared/Modal/ActionModal';
import { useState } from 'react';
import Button from 'Components/Shared/Button/Button';

const TableRow = ({ item, columns, deleteItem, edit }) => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const deleteTitle = 'DELETE';

  const deleteQuestion = 'Are you sure you want to delete this?';

  return (
    <>
      <tr>
        {columns.map((columnItem, index) => {
          if (columnItem.heading === 'Actions') {
            return (
              <>
                <td>
                  <Button
                    href={`${edit}/${item._id}`}
                    style="squaredSecondary"
                    disabled={false}
                    text="Edit"
                  />
                  <Button
                    onClick={openModal}
                    style="squaredPrimary"
                    disabled={false}
                    text="Delete"
                  />
                  <Modal
                    showModal={showModal}
                    closeModal={closeModal}
                    confirmAction={deleteItem}
                    title={deleteTitle}
                    message={deleteQuestion}
                    id={item._id}
                  />
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
            return (
              <td key={index}>
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
    </>
  );
};

export default TableRow;
