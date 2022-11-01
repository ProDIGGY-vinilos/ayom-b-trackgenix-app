import { useEffect, useState } from 'react';
import styles from './time-sheets.module.css';
import ExpandButton from './Expand button';
import DeleteButton from './Delete Button';
import CreateButton from './Create Button';

function TimeSheets() {
  const [TimeSheets, saveTimeSheets] = useState([]);
  /* const [toggleProjects, setToggleProjects] = useState(false);
  const [toggleTasks, setToggleTasks] = useState(false);
  const [toggleEmployee, setToggleEmployee] = useState(false); */

  useEffect(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/timeSheet`);
      const data = await response.json();
      saveTimeSheets(data.data);
    } catch (error) {
      console.error(error);
    }
  }, [TimeSheets]);

  const deleteTimesheet = async (id) => {
    await fetch(`${process.env.REACT_APP_API_URL}/timeSheet/${id}`, {
      method: 'DELETE'
    });
  };

  return (
    <section className={styles.container}>
      <h2>TimeSheets</h2>
      <table>
        <tr>
          <th>Descritpion</th>
          <th>Date</th>
          <th>Project</th>
          <th>Task</th>
          <th>Employee</th>
          <th>Hours</th>
          <th></th>
          <th></th>
        </tr>
        {TimeSheets.map((TimeSheet) => {
          return (
            <tr key={TimeSheet._id}>
              <td key={TimeSheet._id}>{TimeSheet.description}</td>
              <td key={TimeSheet._id}>{TimeSheet.date}</td>
              <td key={TimeSheet._id}>
                {TimeSheet.project.description}
                <ExpandButton />
              </td>
              <td key={TimeSheet._id}>
                {TimeSheet.task.description}
                <ExpandButton />
              </td>
              <td key={TimeSheet._id}>
                {TimeSheet.employee.name}
                <ExpandButton />
              </td>
              <td key={TimeSheet._id}>{TimeSheet.hours}</td>
              <td>
                <a href={`/time-sheet-form/${TimeSheet._id}`}>
                  <button>Edit</button>
                </a>
              </td>
              <td key={TimeSheet._id}>
                <DeleteButton onDelete={deleteTimesheet} timeSheetId={TimeSheet._id} />
              </td>
            </tr>
          );
        })}
      </table>
      <CreateButton />
    </section>
  );
}

export default TimeSheets;
