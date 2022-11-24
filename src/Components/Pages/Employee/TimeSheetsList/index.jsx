import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTimeSheetsByEmployee } from 'redux/timeSheets/thunks';
import styles from 'Components/Pages/Employee/TimeSheetsList/time-sheets.module.css';
import Table from 'Components/Shared/Table';
import Button from 'Components/Shared/Button/Button';

const TimeSheetsList = () => {
  const employeeId = '636c1e8ddabe537336ae082a';
  const { list: timeSheetsList, isLoading } = useSelector((state) => state.timeSheets);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTimeSheetsByEmployee(employeeId));
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
          <Button
            href="/employee/time-sheet-form"
            style="roundedPrimary"
            disabled={false}
            text="+"
          />
        </>
      )}
    </section>
  );
};

export default TimeSheetsList;
