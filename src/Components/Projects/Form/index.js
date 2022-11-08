import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FormEmployee from './FormEmployees/index';
import Modal from '../Modal';
import DatePicker from '../../Shared/Datepicker';
import styles from './form.module.css';

const index = (props) => {
  const projectId = useParams().id;
  const [projectBody, setProjectBody] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    clientName: '',
    employees: [
      {
        employee: '',
        role: '',
        rate: ''
      }
    ]
  });
  const [employees, setEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isFetched, setIsFetched] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const openModal = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(async () => {
    if (projectId) {
      try {
        setIsFetched(true);
        const response = await fetch(`${process.env.REACT_APP_API_URL}/projects/${projectId}`);
        const data = await response.json();
        setProjectBody({
          name: data.data.name,
          description: data.data.description,
          startDate: data.data.startDate.substring(0, 10),
          endDate: data.data.endDate.substring(0, 10),
          clientName: data.data.clientName,
          employees: [
            {
              employee: data.data.employees[0].employee._id,
              role: data.data.employees[0].role,
              rate: data.data.employees[0].rate
            }
          ]
        });
      } catch (error) {
        setIsFetched(false);
        alert(error);
      }
    } else {
      setIsFetched(false);
    }
    setIsLoading(false);
  }, []);

  useEffect(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/employees`);
      const data = await response.json();
      setEmployees(data.data);
    } catch (error) {
      alert(error);
    }
  }, []);

  const onChangeValue = (key, value, keyArray = false) => {
    if (keyArray) {
      setProjectBody({
        ...projectBody,
        employees: [{ ...projectBody.employees[0], [key]: value }]
      });
    } else {
      setProjectBody({ ...projectBody, [key]: value });
    }
  };

  const onSubmit = async () => {
    if (projectId) {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/projects/${projectId}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(projectBody)
      });
      const data = await response.json();
      //CAMBIAR ESTADO  200 por 201
      if (response.status === 201) {
        alert(data.message);
        props.history.goBack();
      } else if ([404, 500].includes(response.status)) {
        alert(data.message);
      }
    } else {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/projects/`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(projectBody)
      });
      const data = await response.json();

      if (response.status === 201) {
        alert(data.message);
        props.history.goBack();
      } else if (response.status === 400) {
        alert(data.message);
      }
    }
  };

  return (
    <div className={styles.container}>
      {isLoading && <h3>Loading</h3>}
      {isFetched ? <h2>Edit Project</h2> : <h2>Add New Project</h2>}
      <form className={styles.formContainer} onSubmit={onSubmit}>
        <div className={styles.formDiv}>
          <label>Project Name: </label>
          <input
            type="text"
            name="name"
            value={isFetched ? projectBody.name : undefined}
            onChange={(e) => onChangeValue('name', e.target.value)}
            required
          />
        </div>
        <div className={styles.formDiv}>
          <label>Client Name</label>
          <input
            type="text"
            name="client name"
            value={isFetched ? projectBody.clientName : undefined}
            onChange={(e) => onChangeValue('clientName', e.target.value)}
            required
          />
        </div>
        <div className={styles.formFull}>
          <label>Description</label>
          <textarea
            name="description"
            cols="30"
            rows="10"
            className={styles.textarea}
            value={isFetched ? projectBody.description : undefined}
            onChange={(e) => onChangeValue('description', e.target.value)}
          ></textarea>
        </div>
        <div className={styles.formDiv}>
          <DatePicker
            label="Start Date"
            inputValue={projectBody.startDate.substring(0, 10)}
            changeValue={(value) => onChangeValue('startDate', value)}
          />
        </div>
        <div className={styles.formDiv}>
          <DatePicker
            label="End Date"
            inputValue={projectBody.endDate.substring(0, 10)}
            changeValue={(value) => onChangeValue('endDate', value)}
          />
        </div>
        <h4 className={styles.formFull}>Employees: </h4>
        {projectBody.employees.map((employee) => {
          return (
            <div className={`${styles.formFull} ${styles.employeesDiv}`} key={index}>
              <FormEmployee
                key={employee}
                employees={employees}
                employee={isFetched ? employee : undefined}
                changeValue={onChangeValue}
              />
            </div>
          );
        })}
        <div>
          <button className={styles.btn} onClick={openModal}>
            Submit
          </button>
        </div>
      </form>
      <Modal
        show={showModal}
        closeModal={closeModal}
        onAddUpdate={onSubmit}
        id={isFetched ? projectBody._id : undefined}
        title={isFetched ? 'Update Project' : 'Add New Project'}
        text={
          isFetched
            ? `Are you sure you want to update the project?`
            : `Are you sure you want to add the project "${projectBody.name}"?`
        }
      />
    </div>
  );
};

export default index;
