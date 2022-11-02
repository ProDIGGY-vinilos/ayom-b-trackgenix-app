import { useState, useEffect } from 'react';
import styles from './form.module.css';
import Select from '../Select/';

const TimeSheetsForm = () => {
  const [Projects, setProjects] = useState([]);
  const [Employees, setEmployees] = useState([]);
  const [Tasks, setTasks] = useState([]);
  const [Description, setDescription] = useState('');
  const [Date, setDate] = useState('');
  const [Hours, setHours] = useState('');
  const [ProjectId, setProjectId] = useState('');
  const [EmployeeId, setEmployeeId] = useState('');
  const [TaskId, setTaskId] = useState('');
  const [timeSheet, setTimeSheet] = useState({});
  const path = window.location.pathname.split('/');
  let timeSheetId = path[path.length - 1];
  let formSwitch;

  timeSheetId.length == 24 ? (formSwitch = true) : (formSwitch = false);

  const projectsFetch = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/projects`);
      const data = await response.json();
      setProjects(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const setStates = (timesheet) => {
    setDescription(timesheet.description);
    setDate(timesheet.date);
    setHours(timesheet.hours);
    setProjectId(timesheet.project);
    setEmployeeId(timesheet.employee);
    setTaskId(timesheet.task);
  };

  const tasksFetch = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks`);
      const data = await response.json();
      setTasks(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const employeesFetch = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/employees`);
      const data = await response.json();
      setEmployees(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const timeSheetFetch = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/timeSheet/${id}`);
      const data = await response.json();
      setTimeSheet(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    projectsFetch();
    tasksFetch();
    employeesFetch();
    if (formSwitch) {
      timeSheetFetch(timeSheetId);
      setStates(timeSheet);
    }
  }, []);

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
      await fetch(`${process.env.REACT_APP_API_URL}/timeSheet/${timeSheetId}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(req)
      });
    } else {
      await fetch(`${process.env.REACT_APP_API_URL}/timeSheet/`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(req)
      });
    }
  };

  return (
    <div className={styles.container}>
      {formSwitch ? <h2>Edit time sheet</h2> : <h2>Add new time sheet</h2>}
      <form>
        <div className={styles.formcontainer}>
          <div>
            <label>Date</label>
            <input value={Date} onChange={(e) => setDate(e.target.value)} type="date"></input>
          </div>
          <div>
            <label>Hours</label>
            <input
              value={Hours}
              onChange={(e) => setHours(e.target.value)}
              type="text"
              placeholder="Hours"
            ></input>
          </div>
          <div>
            <label>Select Project</label>
            <Select Data={Projects} setId={setProjectId} field="description" />
          </div>
          <div>
            <label>Select Employee</label>
            <Select Data={Employees} setId={setEmployeeId} field="name" />
          </div>
          <div>
            <label>Select Task</label>
            <Select Data={Tasks} setId={setTaskId} field="description" />
          </div>
        </div>
        <div className={styles.textareacontainer}>
          <label>Description</label>
          <textarea
            value={Description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
          ></textarea>
        </div>
      </form>
      <div className={styles.buttons}>
        <button
          onClick={() => createTimeSheet(Description, Date, Hours, ProjectId, TaskId, EmployeeId)}
        >
          Submit
        </button>
        <button>
          <a href="/../time-sheets">Go Back</a>
        </button>
      </div>
    </div>
  );
};

export default TimeSheetsForm;
