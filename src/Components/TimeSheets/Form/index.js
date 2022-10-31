import { useState, useEffect } from 'react';
import styles from './form.module.css';

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

  const projectsFetch = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/projects`);
      const data = await response.json();
      setProjects(data.data);
    } catch (error) {
      console.error(error);
    }
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

  useEffect(() => {
    projectsFetch();
    tasksFetch();
    employeesFetch();
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
    console.log(JSON.stringify(req));
    await fetch(`${process.env.REACT_APP_API_URL}/timeSheet/`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(req)
    });
  };

  return (
    <div className={styles.container}>
      <h2>Add new time sheet</h2>
      <form>
        <label>Description</label>
        <textarea
          value={Description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        ></textarea>
        <label>Date</label>
        <input value={Date} onChange={(e) => setDate(e.target.value)} type="date"></input>
        <label>Hours</label>
        <input
          value={Hours}
          onChange={(e) => setHours(e.target.value)}
          type="text"
          placeholder="Hours"
        ></input>
        <label>Select Project</label>
        <select onChange={(e) => setProjectId(e.target.value)}>
          {Projects.map((Project) => {
            return (
              <option value={Project._id} key={Project._id}>
                {Project.name}
              </option>
            );
          })}
        </select>
        <label>Select Employee</label>
        <select onChange={(e) => setEmployeeId(e.target.value)}>
          {Employees.map((Employee) => {
            return (
              <option value={Employee._id} key={Employee._id}>
                {Employee.name}
              </option>
            );
          })}
        </select>
        <label>Select Tasks</label>
        <select onChange={(e) => setTaskId(e.target.value)}>
          {Tasks.map((Task) => {
            return (
              <option value={Task._id} key={Task._id}>
                {Task.description}
              </option>
            );
          })}
        </select>
      </form>
      <button
        onClick={() => createTimeSheet(Description, Date, Hours, ProjectId, TaskId, EmployeeId)}
      >
        Submit
      </button>
      <a href="/../time-sheets">
        <button>Go Back</button>
      </a>
    </div>
  );
};

export default TimeSheetsForm;
