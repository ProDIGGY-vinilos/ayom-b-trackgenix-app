import { useEffect, useState } from 'react';
import styles from './time-sheets.module.css';

function TimeSheets() {
  const [TimeSheets, saveTimeSheets] = useState([]);

  useEffect(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}api/timeSheet`);
      const data = await response.json();
      saveTimeSheets(data.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <section className={styles.container}>
      <h2>TimeSheets</h2>
      <div>
        {TimeSheets.map((TimeSheet) => {
          return <div key={TimeSheet._id}>{TimeSheet.description}</div>;
        })}
      </div>
    </section>
  );
}

export default TimeSheets;
