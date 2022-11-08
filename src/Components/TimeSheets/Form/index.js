import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from './form.module.css';
import Select from '../Select/';
import InputField from '../../Shared/Input/input';

const TimeSheetsForm = (props) => {
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
  const [formSwitch, setFormSwitch] = useState(false);
  const [timeSheetId, setTimeSheetId] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [employeeName, setEmployeeName] = useState('');
  const [taskDescription, settaskDescription] = useState('');

  const setStates = (timeSheet) => {
    setDescription(timeSheet.description);
    setDate(timeSheet.date);
    setHours(timeSheet.hours);
    setProjectId(timeSheet.project);
    setEmployeeId(timeSheet.employee);
    setTaskId(timeSheet.task);
    setEmployeeName(timeSheet.employee.name);
    setProjectDescription(timeSheet.project.description);
    settaskDescription(timeSheet.task.description);
  };

  const projectsFetch = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/projects`);
      const data = await response.json();
      setProjects(data.data);
    } catch (error) {
      alert(error);
    }
  };

  const tasksFetch = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks`);
      const data = await response.json();
      setTasks(data.data);
    } catch (error) {
      alert(error);
    }
  };

  const employeesFetch = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/employees`);
      const data = await response.json();
      setEmployees(data.data);
    } catch (error) {
      alert(error);
    }
  };

  const timeSheetFetch = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/timeSheet/${id}`);
      const data = await response.json();
      setStates(data.data);
    } catch (error) {
      alert(error);
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
      alert(data.message);
      if (response.status === 200) {
        props.history.goBack();
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
      alert(data.message);
      if (response.status === 201) {
        props.history.goBack();
      }
    }
  };

  return (
    <div className={styles.container}>
      {formSwitch ? <h2>Edit time sheet</h2> : <h2>Add new time sheet</h2>}
      <form>
        <div className={styles.formcontainer}>
          <div>
            <label>Date</label>
            <input
              value={date.substring(0, 10) || undefined}
              onChange={(e) => setDate(e.target.value)}
              type="date"
            ></input>
          </div>
          <div>
            <InputField
              label="Hours"
              type="text"
              value={hours || undefined}
              onChange={(e) => setHours(e.target.value)}
            />
          </div>
          <div>
            <label>Select Project</label>
            <Select
              defaultValue={projectDescription}
              switcher={formSwitch}
              data={projects || undefined}
              setId={setProjectId}
              field="description"
            />
          </div>
          <div>
            <label>Select Employee</label>
            <Select
              defaultValue={employeeName}
              switcher={formSwitch}
              data={employees || undefined}
              setId={setEmployeeId}
              field="name"
            />
          </div>
          <div>
            <label>Select Task</label>
            <Select
              defaultValue={taskDescription}
              switcher={formSwitch}
              data={tasks || undefined}
              setId={setTaskId}
              field="description"
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
      <div className={styles.buttons}>
        <button
          onClick={() => createTimeSheet(description, date, hours, projectId, taskId, employeeId)}
        >
          Submit
        </button>
        <Link to="/time-sheets">
          <button>Go Back</button>
        </Link>
      </div>
    </div>
  );
};

export default TimeSheetsForm;
