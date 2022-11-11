import { useEffect, useState } from 'react';
import styles from './time-sheets.module.css';
import MessageModal from '../Shared/Modal/MessageModal';
import Table from '../Shared/Table';
import Button from '../Shared/Button/Button';

const TimeSheets = () => {
  const [timeSheets, setTimeSheets] = useState([]);
  const [typeModal, setTypeModal] = useState();
  const [textModal, setTextModal] = useState();
  const [showMessageModal, setShowMessageModal] = useState(false);

  const openMessageModal = () => {
    setShowMessageModal(true);
  };

  const closeMessageModal = () => {
    setShowMessageModal(false);
  };

  useEffect(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/timeSheet`);
      const data = await response.json();
      setTimeSheets(data.data);
    } catch (error) {
      setTypeModal('Error');
      setTextModal(error);
      openMessageModal();
      return;
    }
  }, []);

  const deleteTimeSheet = async (id) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/timeSheet/${id}`, {
      method: 'DELETE'
    });
    if (response.status === 204) {
      setTimeSheets([...timeSheets.filter((timeSheetItem) => timeSheetItem._id !== id)]);
      setTypeModal('Success');
      setTextModal('The timesheet was successfully removed');
      openMessageModal();
      return;
    } else {
      setTypeModal('Error');
      setTextModal('There was an error');
      openMessageModal();
      return;
    }
  };

  const columns = [
    { heading: 'Description', value: 'description' },
    { heading: 'Date', value: 'date', type: 'date' },
    { heading: 'Project', value: 'project', subValue: 'name' },
    { heading: 'Task', value: 'task', subValue: 'description' },
    { heading: 'Employee', value: 'employee', subValue: 'lastName' },
    { heading: 'Hours', value: 'hours' },
    { heading: 'Actions' }
  ];

  return (
    <section className={styles.container}>
      <h2>Time Sheets</h2>
      <Table
        data={timeSheets}
        columns={columns}
        deleteItem={deleteTimeSheet}
        edit="/time-sheet-form"
      />
      <MessageModal
        type={typeModal}
        isOpen={showMessageModal}
        message={textModal}
        handleClose={closeMessageModal}
        goBack={'/time-sheets'}
      />
      <Button href="/time-sheet-form" style="roundedPrimary" disabled={false} text="+" />
    </section>
  );
};

export default TimeSheets;
