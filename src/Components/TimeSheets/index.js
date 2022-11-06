import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './time-sheets.module.css';
import CreateButton from './Create Button';
import ExpandModal from './Expand Modal';
import ConfirmModal from './Confirmation Modal';

function TimeSheets() {
  const [timeSheets, setTimeSheets] = useState([]);
  const [showExpandModal, setShowExpandModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [element, setElement] = useState('');
  const [modalData, setModalData] = useState({});
  const [timeSheetId, setTimeSheetId] = useState('');

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
      alert('Timesheet deleted');
    } else {
      alert('Error Encountered');
    }
  };

  const closeExpandModal = () => {
    setShowExpandModal(false);
  };

  const closeConfirmModal = () => {
    setShowConfirmModal(false);
  };

  const handleDeleteClick = (id) => {
    setShowConfirmModal(true);
    setTimeSheetId(id);
  };

  return (
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
                      setShowExpandModal(true);
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
                      setShowExpandModal(true);
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
                      setShowExpandModal(true);
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
                  <button onClick={() => handleDeleteClick(TimeSheet._id)}>
                    <a>Delete</a>
                  </button>
                </td>
              </tr>
            );
          })}
        </table>
        <CreateButton />
      </section>
      <ExpandModal
        openModal={showExpandModal}
        closeModal={closeExpandModal}
        element={element}
        data={modalData}
      />
      <ConfirmModal
        openModal={showConfirmModal}
        closeModal={closeConfirmModal}
        onDelete={deleteTimesheet}
        timeSheetId={timeSheetId}
        timeSheets={TimeSheets}
      />
    </>
  );
}

export default TimeSheets;
