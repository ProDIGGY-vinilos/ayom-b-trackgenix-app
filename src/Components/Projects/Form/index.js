import React, { useEffect, useState } from 'react';
import FormEmployee from './FormEmployees/index';
import Modal from '../Modal';
import styles from './form.module.css';

const index = ({ text }) => {
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
  const [fetched, setFectched] = useState('');
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
        const response = await fetch(`${process.env.REACT_APP_API_URL}api/projects/${projectId}`);
        const data = await response.json();
        setFectched('true');
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
        console.error(error);
      }
    }
    if (projectId === 'project-form') {
      setFectched('false');
    }
    setIsLoading(false);
  }, [idState]);

  useEffect(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}api/employees`);
      const data = await response.json();
      setEmployees(data.data);
    } catch (error) {
      alert(error);
    }
  }, []);

  const onChangeNameValue = (e) => {
    setProjectBody({ ...projectBody, name: e.target.value });
  };

  const onChangeDescriptionValue = (e) => {
    setProjectBody({ ...projectBody, description: e.target.value });
  };

  const onChangeStartDateValue = (e) => {
    setProjectBody({ ...projectBody, startDate: e.target.value });
  };

  const onChangeEndDateValue = (e) => {
    setProjectBody({ ...projectBody, endDate: e.target.value });
  };

  const onChangeClientNameValue = (e) => {
    setProjectBody({ ...projectBody, clientName: e.target.value });
  };

  const onChangeEmployeeValue = (newValue) => {
    setProjectBody({
      ...projectBody,
      employees: [{ ...projectBody.employees[0], employee: newValue }]
    });
  };

  const onChangeRoleValue = (newValue) => {
    setProjectBody({
      ...projectBody,
      employees: [{ ...projectBody.employees[0], role: newValue }]
    });
  };

  const onChangeRateValue = (e) => {
    setProjectBody({
      ...projectBody,
      employees: [{ ...projectBody.employees[0], rate: e.target.value }]
    });
  };

  const onSubmit = async () => {
    if (idState.length === 24) {
      const response = await fetch(`${process.env.REACT_APP_API_URL}api/projects/${idState}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(projectBody)
      });
      const data = await response.json();

      if (response.status === 200) {
        alert(data.msg);
        window.location.href = document.location.href = '/projects';
      } else if (response.status === 400) {
        alert(data.message);
      } else if (response.status === 404) {
        alert(data.msg);
      } else if (response.status === 500) {
        alert(data.msg);
      }
    } else {
      const response = await fetch(`${process.env.REACT_APP_API_URL}api/projects/`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(projectBody)
      });
      const data = await response.json();

      if (response.status === 201) {
        alert(data.message);
        window.location.href = document.location.href = '/projects';
      } else if (response.status === 400) {
        alert(data.message);
      }
    }
  };

  return (
    <div className={styles.container}>
      {isLoading && <h3>Loading</h3>}
      {fetched === 'true' && <h2>Edit Project</h2>}
      {fetched === 'false' && <h2>Add New Project</h2>}
      <form className={styles.formContainer} onSubmit={onSubmit}>
        {fetched === 'true' ? (
          <>
            <div className={styles.formDiv}>
              <label>Project Name: </label>
              <input
                type="text"
                name="name"
                defaultValue={projectBody.name}
                onChange={onChangeNameValue}
                required
              />
            </div>
            <div className={styles.formDiv}>
              <label>Client Name</label>
              <input
                type="text"
                name="client name"
                defaultValue={projectBody.clientName}
                onChange={onChangeClientNameValue}
                required
              />
            </div>
            <div className={styles.formFull}>
              <label>Description</label>
              <textarea
                name=""
                id=""
                cols="30"
                rows="10"
                className={styles.textarea}
                defaultValue={projectBody.description}
                onChange={onChangeDescriptionValue}
              ></textarea>
            </div>
            <div className={styles.formDiv}>
              <label>Start Date</label>
              <input
                type="text"
                name="start date"
                defaultValue={projectBody.startDate}
                onChange={onChangeStartDateValue}
                required
              />
            </div>
            <div className={styles.formDiv}>
              <label>End Date</label>
              <input
                type="text"
                name="end date"
                defaultValue={projectBody.endDate}
                onChange={onChangeEndDateValue}
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
                    eachEmployee={employee}
                    changeEmployeeValue={onChangeEmployeeValue}
                    changeRoleValue={onChangeRoleValue}
                    changeRateValue={onChangeRateValue}
                  />
                </div>
              );
            })}
          </>
        ) : (
          <>
            <div className={styles.formDiv}>
              <label>Project Name: </label>
              <input type="text" on onChange={onChangeNameValue} />
            </div>
            <div className={styles.formDiv}>
              <label htmlFor="">Client Name: </label>
              <input type="text" onChange={onChangeClientNameValue} />
            </div>
            <div className={styles.formFull}>
              <label htmlFor="">Description: </label>
              <textarea
                name=""
                id=""
                cols="30"
                rows="10"
                className={styles.textarea}
                onChange={onChangeDescriptionValue}
              ></textarea>
            </div>
            <div className={styles.formDiv}>
              <label htmlFor="">Start Date: </label>
              <input type="text" onChange={onChangeStartDateValue} />
            </div>
            <div className={styles.formDiv}>
              <label htmlFor="">End Date: </label>
              <input type="text" onChange={onChangeEndDateValue} />
            </div>
            <h4 className={styles.formFull}>Employees: </h4>
            {projectBody.employees.map((index) => {
              return (
                <div className={`${styles.formFull} ${styles.employeesDiv}`} key={index}>
                  <FormEmployee
                    employees={employees}
                    numberOfEmployee={index}
                    changeEmployeeValue={onChangeEmployeeValue}
                    changeRoleValue={onChangeRoleValue}
                    changeRateValue={onChangeRateValue}
                  />
                </div>
              );
            })}
          </>
        )}
        <div>
          <button className={styles.btn} onClick={openModal}>
            {text}
          </button>
        </div>
      </form>
      {fetched === 'true' && (
        <Modal
          show={showModal}
          closeModal={closeModal}
          onAddUpdate={onSubmit}
          id={projectBody._id}
          title={'Update Project'}
          text={`Are you sure you want to update the project "${projectBody.name}"?`}
        />
      )}
      {fetched === 'false' && (
        <Modal
          show={showModal}
          closeModal={closeModal}
          onAddUpdate={onSubmit}
          title={'Add New Project'}
          text={`Are you sure you want to add the project "${projectBody.name}"?`}
        />
      )}
    </div>
  );
};

export default index;
