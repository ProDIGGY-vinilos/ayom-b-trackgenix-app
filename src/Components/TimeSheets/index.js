import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './time-sheets.module.css';
import Table from '../Shared/Table';
/* import DeleteButton from './Delete Button';
import CreateButton from './Create Button';
import ExpandModal from './Expand Modal'; */

function TimeSheets() {
  const [timeSheets, setTimeSheets] = useState([]);
  /* const [showModal, setShowModal] = useState(false);
  const [element, setElement] = useState('');
  const [modalData, setModalData] = useState({}); */

  useEffect(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/timeSheet`);
      const data = await response.json();
      setTimeSheets(data.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  console.log(timeSheets);

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

  /* const closeModal = () => {
    setShowModal(false);
  }; */

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

  /* return (
    <>
      <section className={styles.container}>
        <h2 className={styles.title}>TimeSheets</h2>
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
          {timeSheets.map((TimeSheet) => {
            return (
              <tr key={TimeSheet._id}>
                <td key={TimeSheet._id}>{TimeSheet.description}</td>
                <td key={TimeSheet._id}>{TimeSheet.date}</td>
                <td key={TimeSheet._id}>
                  {TimeSheet.project.description}
                  <button
                    onClick={() => {
                      setShowModal(true);
                      setElement('Project');
                      setModalData(TimeSheet.project);
                    }}
                  >
                    +
                  </button>
                </td>
                <td key={TimeSheet._id}>
                  {TimeSheet.task.description}
                  <button
                    onClick={() => {
                      setShowModal(true);
                      setElement('Task');
                      setModalData(TimeSheet.task);
                    }}
                  >
                    +
                  </button>
                </td>
                <td key={TimeSheet._id}>
                  {TimeSheet.employee?.name}
                  <button
                    onClick={() => {
                      setShowModal(true);
                      setElement('Employee');
                      setModalData(TimeSheet.employee);
                    }}
                  >
                    +
                  </button>
                </td>
                <td key={TimeSheet._id}>{TimeSheet.hours}</td>
                <td>
                  <Link to={`/time-sheet-form/${TimeSheet._id}`}>
                    <button>Edit</button>
                  </Link>
                </td>
                <td key={TimeSheet._id}>
                  <DeleteButton
                    onDelete={deleteTimesheet}
                    timeSheetId={TimeSheet._id}
                    timeSheets={TimeSheets}
                  />
                </td>
              </tr>
            );
          })}
        </table>
        <CreateButton />
      </section>
      <ExpandModal
        openModal={showModal}
        closeModal={closeModal}
        element={element}
        data={modalData}
      />
    </>
  ); */
}

export default TimeSheets;
