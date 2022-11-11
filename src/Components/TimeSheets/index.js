import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTimeSheets } from '../../redux/timeSheets/thunks';
import styles from './time-sheets.module.css';
import MessageModal from '../Shared/Modal/MessageModal';
import Table from '../Shared/Table';
import Button from '../Shared/Button/Button';

const TimeSheets = () => {
  const [typeModal, setTypeModal] = useState();
  const [textModal, setTextModal] = useState();
  const [showMessageModal, setShowMessageModal] = useState(false);

  const { list: timeSheetsList, isLoading, error } = useSelector((state) => state.timeSheets);
  const dispatch = useDispatch();
  const openMessageModal = () => {
    setShowMessageModal(true);
  };

  const closeMessageModal = () => {
    setShowMessageModal(false);
  };

  useEffect(() => {
    dispatch(getTimeSheets());
  }, []);

  const deleteTimeSheet = async (id) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/timeSheet/${id}`, {
      method: 'DELETE'
    });
    if (response.status === 204) {
      dispatch(getTimeSheets());
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

  if (error) {
    return (
      <section className={styles.container}>
        <h2>Time Sheets</h2>
        <h3>{error}</h3>
      </section>
    );
  }

  return (
    <section className={styles.container}>
      <h2>Time Sheets</h2>
      {isLoading ? (
        <h3>Loading...</h3>
      ) : (
        <>
          <Table
            data={timeSheetsList}
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
        </>
      )}
    </section>
  );
};

export default TimeSheets;
