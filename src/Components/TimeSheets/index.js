import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './time-sheets.module.css';
import DeleteButton from './Delete Button';
import CreateButton from './Create Button';
import ExpandModal from './Expand Modal';
import Modal from '../Shared/Modal';

function TimeSheets() {
  const [timeSheets, setTimeSheets] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [element, setElement] = useState('');
  const [modalData, setModalData] = useState({});
  const [typeModal, setTypeModal] = useState();
  const [textModal, setTextModal] = useState();
  const [showMessageModal, setShowMessageModal] = useState(false);

  const openMessageModal = () => {
    setShowMessageModal(true);
  };

  const closeMessageModal = () => {
    setShowMessageModal(false);
  };

  useEffect(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/timeSheet`);
      const data = await response.json();
      setTimeSheets(data.data);
    } catch (error) {
      setTypeModal('Error');
      setTextModal(error);
      openMessageModal();
      return;
    }
  }, []);

  const deleteTimesheet = async (id) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/timeSheet/${id}`, {
      method: 'DELETE'
    });
    if (response.status === 204) {
      setTimeSheets([...timeSheets.filter((timeSheetItem) => timeSheetItem._id !== id)]);
      setTypeModal('DELETE');
      setTextModal('The timesheet was successfully removed');
      openMessageModal();
      return;
    } else {
      setTypeModal('Error');
      setTextModal('There was an error');
      openMessageModal();
      return;
    }
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
      <Modal
        type={typeModal}
        isOpen={showMessageModal}
        message={textModal}
        handleClose={closeMessageModal}
        goBack={'/admins'}
      />
    </>
  );
}

export default TimeSheets;
