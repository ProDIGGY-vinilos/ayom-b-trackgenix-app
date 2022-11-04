import React, { useEffect, useState } from 'react';
import FormEmployee from './FormEmployees/index';
import Modal from '../Modal';
import styles from './form.module.css';

const index = () => {
  const [idState, setIdState] = useState('');
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
    const path = window.location.pathname.split('/');
    let projectId = path[path.length - 1];
    setIdState(projectId);
    if (projectId !== 'project-form') {
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
    if (idState.length === 24) {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/projects/${idState}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(projectBody)
      });
      const data = await response.json();

      if (response.status === 200) {
        alert(data.msg);
        document.location.href = '/projects';
      } else if ([404, 500].includes(response.status)) {
        alert(data.msg);
      } else if (response.status === 400) {
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
        document.location.href = '/projects';
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
            value={isFetched && projectBody.name}
            onChange={(e) => onChangeValue('name', e.target.value)}
            required
          />
        </div>
        <div className={styles.formDiv}>
          <label>Client Name</label>
          <input
            type="text"
            name="client name"
            value={isFetched && projectBody.clientName}
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
            value={isFetched && projectBody.description}
            onChange={(e) => onChangeValue('description', e.target.value)}
          ></textarea>
        </div>
        <div className={styles.formDiv}>
          <label>Start Date</label>
          <input
            type="date"
            name="start date"
            value={isFetched && projectBody.startDate}
            onChange={(e) => onChangeValue('startDate', e.target.value)}
            required
          />
        </div>
        <div className={styles.formDiv}>
          <label>End Date</label>
          <input
            type="date"
            name="end date"
            value={isFetched && projectBody.endDate}
            onChange={(e) => onChangeValue('endDate', e.target.value)}
            required
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
