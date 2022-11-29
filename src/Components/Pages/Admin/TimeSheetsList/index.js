import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTimeSheets } from 'redux/timeSheets/thunks';
import styles from 'Components/Pages/Employee/TimeSheetsList/time-sheets.module.css';
import Table from 'Components/Shared/Table';

const TimeSheetsList = () => {
  const { list: timeSheetsList, isLoading } = useSelector((state) => state.timeSheets);
  const dispatch = useDispatch();
  const token = sessionStorage.getItem('token');

  useEffect(() => {
    dispatch(getTimeSheets(token));
  }, []);

  const columns = [
    { heading: 'Description', value: 'description' },
    { heading: 'Date', value: 'date', type: 'date' },
    { heading: 'Project', value: 'project', subValue: 'name' },
    { heading: 'Task', value: 'task', subValue: 'description' },
    { heading: 'Hours', value: 'hours' }
  ];

  return (
    <section className={styles.container}>
      {isLoading ? (
        <h3>Loading...</h3>
      ) : (
        <>
          <h2 className={styles.title}>Timesheets</h2>
          <Table data={timeSheetsList} columns={columns} />
        </>
      )}
    </section>
  );
};

export default TimeSheetsList;
