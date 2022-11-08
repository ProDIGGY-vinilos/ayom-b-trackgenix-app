import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './time-sheets.module.css';
import CreateButton from './Create Button';
import ExpandModal from './Expand Modal';
import Modal from '../Shared/Modal';
import ConfirmModal from './Confirmation Modal';

function TimeSheets() {
  const [timeSheets, setTimeSheets] = useState([]);
  const [showExpandModal, setShowExpandModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [element, setElement] = useState('');
  const [modalData, setModalData] = useState({});
  const [typeModal, setTypeModal] = useState();
  const [textModal, setTextModal] = useState();
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [timeSheetId, setTimeSheetId] = useState('');

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

  const deleteTimeSheet = async (id) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/timeSheet/${id}`, {
      method: 'DELETE'
    });
    if (response.status === 204) {
      setTimeSheets([...timeSheets.filter((timeSheetItem) => timeSheetItem._id !== id)]);
      setTypeModal('Success');
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
        <h2 className={styles.title}>timeSheets</h2>
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
          {timeSheets.map((timeSheet) => {
            return (
              <tr key={timeSheet._id}>
                <td key={timeSheet._id}>{timeSheet.description}</td>
                <td key={timeSheet._id}>{timeSheet.date}</td>
                <td key={timeSheet._id}>
                  {timeSheet.project.description}
                  <button
                    onClick={() => {
                      setShowExpandModal(true);
                      setElement('Project');
                      setModalData(timeSheet.project);
                    }}
                  >
                    +
                  </button>
                </td>
                <td key={timeSheet._id}>
                  {timeSheet.task.description}
                  <button
                    onClick={() => {
                      setShowExpandModal(true);
                      setElement('Task');
                      setModalData(timeSheet.task);
                    }}
                  >
                    +
                  </button>
                </td>
                <td key={timeSheet._id}>
                  {timeSheet.employee?.name}
                  <button
                    onClick={() => {
                      setShowExpandModal(true);
                      setElement('Employee');
                      setModalData(timeSheet.employee);
                    }}
                  >
                    +
                  </button>
                </td>
                <td key={timeSheet._id}>{timeSheet.hours}</td>
                <td>
                  <Link to={`/time-sheet-form/${timeSheet._id}`}>
                    <button>Edit</button>
                  </Link>
                </td>
                <td key={timeSheet._id}>
                  <button onClick={() => handleDeleteClick(timeSheet._id)}>
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
      <Modal
        type={typeModal}
        isOpen={showMessageModal}
        message={textModal}
        handleClose={closeMessageModal}
        goBack={'/admins'}
      />
      <ConfirmModal
        openModal={showConfirmModal}
        closeModal={closeConfirmModal}
        onDelete={deleteTimeSheet}
        timeSheetId={timeSheetId}
        timeSheets={timeSheets}
      />
    </>
  );
}

export default TimeSheets;
