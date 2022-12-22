import React from 'react';
import Modal from 'Components/Shared/Modal/ActionModal';
import { useState } from 'react';
import Button from 'Components/Shared/Button/Button';
import styles from 'Components/Shared/Table/table.module.css';

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
                <td className={styles.buttons}>
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
            let date = item[columnItem.value].substring(0, 10);
            let dateArray = date.split('-');
            let fixedDate = `${dateArray[2]}-${dateArray[1]}-${dateArray[0]}`;
            return <td key={index}>{fixedDate}</td>;
          }

          if (columnItem.subValue) {
            return <td key={index}>{item[columnItem.value][columnItem.subValue]}</td>;
          }

          if (columnItem.array) {
            let employeeAmount = 0;
            for (let index = 0; index < item[columnItem.value].length; index++) {
              employeeAmount++;
            }
            return (
              <td key={index}>
                <p>{employeeAmount}</p>
              </td>
            );
          }

          /* if (columnItem.value === 'description') {
            if (item[columnItem.value].length > 15) {
              return <td key={index}>{item[columnItem.value].substring(0, 45)}...</td>;
            }
          } */

          if (columnItem.value === 'password') {
            let passwordHidden = '';
            for (let index = 0; index < item[columnItem.value].length; index++) {
              passwordHidden += '*';
            }
            return <td key={index}>{passwordHidden}</td>;
          }

          return <td key={index}>{item[columnItem.value]}</td>;
        })}
      </tr>
    </>
  );
};

export default TableRow;
