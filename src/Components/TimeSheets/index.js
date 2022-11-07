import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './time-sheets.module.css';
import Table from '../Shared/Table';

function TimeSheets() {
  const [timeSheets, setTimeSheets] = useState([]);

  useEffect(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/timeSheet`);
      const data = await response.json();
      setTimeSheets(data.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const deleteTimesheet = async (id) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/timeSheet/${id}`, {
      method: 'DELETE'
    });
    if (response.status === 204) {
      setTimeSheets([...timeSheets.filter((timeSheetItem) => timeSheetItem._id !== id)]);
      alert('Used deleted');
    } else {
      alert('Error Encountered');
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
        deleteItem={deleteTimesheet}
        edit="/time-sheet-form"
      />
      <Link to="/time-sheet-form" className={styles.newTimeSheet}>
        +
      </Link>
    </section>
  );
}

export default TimeSheets;
