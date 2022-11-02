import { useEffect, useState } from 'react';
import styles from './time-sheets.module.css';
import DeleteButton from './Delete Button';
import CreateButton from './Create Button';
import ExpandModal from './Expand Modal';

function TimeSheets() {
  const [TimeSheets, setTimeSheets] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [element, setElement] = useState('');
  const [modalData, setModalData] = useState({});

  useEffect(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/timeSheet`);
      const data = await response.json();
      setTimeSheets(data.data);
    } catch (error) {
      console.error(error);
    }
  }, [TimeSheets]);

  const deleteTimesheet = async (id) => {
    await fetch(`${process.env.REACT_APP_API_URL}/timeSheet/${id}`, {
      method: 'DELETE'
    });
  };

  const closeModal = () => {
    setShowModal(false);
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
          {TimeSheets.map((TimeSheet) => {
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
                  {TimeSheet.employee.name}
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
                  <button>
                    <a href={`/time-sheet-form/${TimeSheet._id}`}>Edit</a>
                  </button>
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
      <ExpandModal
        openModal={showModal}
        closeModal={closeModal}
        element={element}
        data={modalData}
      />
    </>
  );
}

export default TimeSheets;
