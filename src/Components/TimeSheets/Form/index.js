import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './form.module.css';
import Select from '../../Shared/Select';
import InputField from '../../Shared/Input/input';
import DatePicker from '../../Shared/Datepicker';
import MessageModal from '../../Shared/Modal/MessageModal';
import Button from '../../Shared/Button/Button';

const TimeSheetsForm = () => {
  const pathed = useParams().id;
  const [projects, setProjects] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [hours, setHours] = useState('');
  const [projectId, setProjectId] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [taskId, setTaskId] = useState('');
  const [timeSheetId, setTimeSheetId] = useState('');
  const [typeModal, setTypeModal] = useState();
  const [textModal, setTextModal] = useState();
  const [showModal, setShowModal] = useState(false);
  const [formSwitch, setFormSwitch] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const setStates = (timeSheet) => {
    setDescription(timeSheet.description);
    setDate(timeSheet.date);
    setHours(timeSheet.hours);
    setProjectId(timeSheet.project._id);
    setEmployeeId(timeSheet.employee._id);
    setTaskId(timeSheet.task._id);
  };

  const projectsFetch = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/projects`);
      const data = await response.json();
      setProjects(data.data);
    } catch (error) {
      setTypeModal('Error');
      setTextModal(error);
      openModal();
      return;
    }
  };

  const tasksFetch = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks`);
      const data = await response.json();
      setTasks(data.data);
    } catch (error) {
      setTypeModal('Error');
      setTextModal(error);
      openModal();
      return;
    }
  };

  const employeesFetch = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/employees`);
      const data = await response.json();
      setEmployees(data.data);
    } catch (error) {
      setTypeModal('Error');
      setTextModal(error);
      openModal();
      return;
    }
  };

  const timeSheetFetch = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/timeSheet/${id}`);
      const data = await response.json();
      setStates(data.data);
    } catch (error) {
      setTypeModal('Error');
      setTextModal(error);
      openModal();
      return;
    }
  };

  useEffect(() => {
    if (pathed) {
      setTimeSheetId(pathed);
      setFormSwitch(true);
    }
    projectsFetch();
    tasksFetch();
    employeesFetch();
  }, []);

  useEffect(() => {
    if (timeSheetId && projects.length && employees.length && tasks.length) {
      timeSheetFetch(timeSheetId);
    }
  }, [projects, employees, tasks]);

  const createTimeSheet = async (Description, Date, Hours, ProjectId, TaskId, EmployeeId) => {
    const req = {
      description: Description,
      date: Date,
      project: ProjectId,
      task: TaskId,
      employee: EmployeeId,
      hours: Hours
    };
    if (formSwitch) {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/timeSheet/${timeSheetId}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(req)
      });
      const data = await response.json();
      if (response.status !== 201) {
        setTypeModal('Error');
        setTextModal(data.message);
        openModal();
        return data;
      } else {
        setTypeModal('Success');
        setTextModal(data.message);
        openModal();
        return data;
      }
    } else {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/timeSheet/`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(req)
      });
      const data = await response.json();
      if (response.status !== 201) {
        setTypeModal('Error');
        setTextModal(data.message);
        openModal();
        return data;
      } else {
        setTypeModal('Success');
        setTextModal(data.message);
        openModal();
        return data;
      }
    }
  };

  return (
    <div className={styles.container}>
      {formSwitch ? (
        <h2 className={styles.title}>Edit time sheet</h2>
      ) : (
        <h2 className={styles.title}>Add new time sheet</h2>
      )}
      <Button href="/time-sheets" style="roundedSecondary" disabled={false} text="X" />
      <form className={styles.form}>
        <div className={styles.formcontainer}>
          <div>
            <DatePicker label="Date" inputValue={date.substring(0, 10)} changeValue={setDate} />
          </div>
          <div>
            <InputField
              label="Hours"
              type="text"
              defaultValue={hours || undefined}
              value={hours || undefined}
              onChange={(e) => setHours(e.target.value)}
            />
          </div>
          <div>
            <Select
              selectedValue={projectId || undefined}
              options={projects || undefined}
              changeValue={setProjectId}
              field="description"
              label="Select Project"
            />
          </div>
          <div>
            <Select
              selectedValue={employeeId || undefined}
              options={employees || undefined}
              changeValue={setEmployeeId}
              field="name"
              label="Select Employee"
            />
          </div>
          <div>
            <Select
              selectedValue={taskId || undefined}
              options={tasks || undefined}
              changeValue={setTaskId}
              field="description"
              label="Select Task"
            />
          </div>
        </div>
        <div className={styles.textareacontainer}>
          <label>Description</label>
          <textarea
            value={description || undefined}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
          ></textarea>
        </div>
      </form>
      <Button
        onClick={() => createTimeSheet(description, date, hours, projectId, taskId, employeeId)}
        style="squaredPrimary"
        disabled={false}
        text="Save"
      />
      <MessageModal
        type={typeModal}
        isOpen={showModal}
        message={textModal}
        handleClose={closeModal}
        goBack={'/time-sheets'}
      />
    </div>
  );
};

export default TimeSheetsForm;
