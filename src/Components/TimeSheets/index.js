import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTimeSheets, deleteTimeSheet } from '../../redux/timeSheets/thunks';
import styles from './time-sheets.module.css';
import MessageModal from '../Shared/Modal/MessageModal';
import Table from '../Shared/Table';
import Button from '../Shared/Button/Button';

const TimeSheets = () => {
  const [typeModal, setTypeModal] = useState('');
  const [textModal, setTextModal] = useState('');
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
    if (!timeSheetsList.length || timeSheetsList.length === 1) {
      dispatch(getTimeSheets());
    }
  }, []);

  useEffect(async () => {
    openModalOnError(error);
  }, [error]);

  const deleteTimeSheets = (id) => {
    dispatch(deleteTimeSheet(id));
    if (error) {
      openModalOnError(error);
    } else {
      setTypeModal('Success');
      setTextModal('TimeSheet was successfully removed');
      openMessageModal();
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

  const openModalOnError = (error) => {
    if (error) {
      setTypeModal('Error');
      setTextModal(error);
      openMessageModal();
    }
  };

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
            deleteItem={deleteTimeSheets}
            edit="/time-sheet-form"
          />
          <MessageModal
            type={typeModal}
            isOpen={showMessageModal}
            message={textModal}
            handleClose={closeMessageModal}
          />
          <Button href="/time-sheet-form" style="roundedPrimary" disabled={false} text="+" />
        </>
      )}
    </section>
  );
};

export default TimeSheets;
