import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FormEmployee from './FormEmployees/index';
import DatePicker from '../../Shared/Datepicker';
import FormModal from '../Modal';
import MessageModal from '../../Shared/Modal/MessageModal';
import styles from './form.module.css';
import InputField from '../../Shared/Input/input';

const Project = () => {
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
  const [typeModal, setTypeModal] = useState();
  const [textModal, setTextModal] = useState();
  const [showSharedModal, setShowSharedModal] = useState(false);

  const openModal = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const openSharedModal = () => {
    setShowSharedModal(true);
  };

  const closeSharedModal = () => {
    setShowSharedModal(false);
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
        setTypeModal('Error');
        setTextModal(error);
        openSharedModal();
        return;
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
      setTypeModal('Error');
      setTextModal(error);
      openSharedModal();
      return;
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
      setTypeModal('Success');
      const response = await fetch(`${process.env.REACT_APP_API_URL}/projects/${projectId}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(projectBody)
      });
      const data = await response.json();
      if (response.status === 201) {
        setTextModal(data.message);
        openSharedModal();
        return data;
      } else if ([400, 404, 500].includes(response.status)) {
        setTypeModal('Error');
        setTextModal(data.message);
        openSharedModal();
        return;
      }
    } else {
      setTypeModal('Success');
      const response = await fetch(`${process.env.REACT_APP_API_URL}/projects/`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(projectBody)
      });
      const data = await response.json();

      if (response.status === 201) {
        setTextModal(data.message);
        openSharedModal();
        return data;
      } else if (response.status === 400) {
        setTypeModal('Error');
        setTextModal(data.message);
        openSharedModal();
        return;
      }
    }
  };

  return (
    <div className={styles.container}>
      {isLoading && <h3>Loading</h3>}
      {isFetched ? (
        <h2 className={styles.title}>Edit Project</h2>
      ) : (
        <h2 className={styles.title}>Add new project</h2>
      )}
      <form className={styles.formContainer} onSubmit={onSubmit}>
        <div className={styles.formDiv}>
          <InputField
            label="Pojec Name"
            name="name"
            type="text"
            placeholder="project name"
            value={isFetched ? projectBody.name : undefined}
            onChange={(e) => onChangeValue('name', e.target.value)}
          />
        </div>
        <div className={styles.formDiv}>
          <InputField
            label="Client Name"
            name="client name"
            type="text"
            placeholder="client name"
            value={isFetched ? projectBody.clientName : undefined}
            onChange={(e) => onChangeValue('clientName', e.target.value)}
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
        {projectBody.employees.map((employee, index) => {
          return (
            <div className={`${styles.formFull} ${styles.employeesDiv}`} key={index}>
              <FormEmployee
                employees={employees || undefined}
                employee={employee}
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
      <MessageModal
        type={typeModal}
        isOpen={showSharedModal}
        message={textModal}
        handleClose={closeSharedModal}
        goBack={'/projects'}
      />
      <FormModal
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

export default Project;
