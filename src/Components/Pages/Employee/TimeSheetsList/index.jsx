import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTimeSheetsByEmployee } from 'redux/timeSheets/thunks';
import { getEmployeeByFirebaseUid } from 'redux/employees/thunks';
import styles from 'Components/Pages/Employee/TimeSheetsList/time-sheets.module.css';
import Table from 'Components/Shared/Table';
import Button from 'Components/Shared/Button/Button';
import { auth } from 'Helpers/firebase/index';
import LoadingModal from 'Components/Shared/Loading';

const TimeSheetsList = () => {
  const userUId = auth.currentUser.uid;
  const { list: timeSheetsList, isLoading } = useSelector((state) => state.timeSheets);
  const employee = useSelector((state) => state.employees);
  const dispatch = useDispatch();
  const token = sessionStorage.getItem('token');

  useEffect(() => {
    dispatch(getEmployeeByFirebaseUid(userUId, token));
  }, []);

  const userId = employee.list[0]?._id;

  useEffect(() => {
    if (userId) {
      dispatch(getTimeSheetsByEmployee(userId, token));
    }
  }, [employee]);

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
        <LoadingModal />
      ) : (
        <>
          <Table data={timeSheetsList} columns={columns} />
          <Button
            href={`/employee/time-sheet-form/${userId}`}
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
