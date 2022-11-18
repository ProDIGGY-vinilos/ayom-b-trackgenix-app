import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FormEmployee from './FormEmployees/index';
import DatePicker from '../../Shared/Datepicker';
import FormModal from '../Modal';
import MessageModal from '../../Shared/Modal/MessageModal';
import styles from './form.module.css';
import Button from '../../Shared/Button/Button';
import InputField from '../../Shared/Input/input';
import { useSelector, useDispatch } from 'react-redux';
import { postProject, putProject } from '../../../redux/projects/thunks';
import getEmployees from '../../../redux/employees/thunks';

const Project = () => {
  let formTitle = 'Title';
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
  const [typeModal, setTypeModal] = useState('');
  const [textModal, setTextModal] = useState('');
  const [showSharedModal, setShowSharedModal] = useState(false);
  const { list: projectList, isLoading, error } = useSelector((state) => state.projects);
  const { list: employeesList } = useSelector((state) => state.employees);
  const dispatch = useDispatch();

  const openModal = () => {
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

  useEffect(() => {
    dispatch(getEmployees());
    if (projectId) {
      setIsFetched(true);
      const newProjectList = [
        ...projectList.filter((projectItem) => projectItem._id === projectId)
      ];
      setProjectBody({
        name: newProjectList[0].name,
        description: newProjectList[0].description,
        startDate: newProjectList[0].startDate.substring(0, 10),
        endDate: newProjectList[0].endDate.substring(0, 10),
        clientName: newProjectList[0].clientName,
        employees: [
          {
            employee: newProjectList[0].employees[0].employee._id,
            role: newProjectList[0].employees[0].role,
            rate: newProjectList[0].employees[0].rate
          }
        ]
      });
    } else {
      setIsFetched(false);
    }
    setEmployees(employeesList);
  }, [employeesList]);

  useEffect(() => {
    setModalMessage(error);
  }, [error]);

  const setModalMessage = (error) => {
    if (error) {
      setTypeModal('Error');
      setTextModal(error);
    } else {
      setTypeModal('Success');
      projectId === ''
        ? setTextModal('Project updated successfully')
        : setTextModal('Project created successfully');
    }
  };

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

  const onSubmit = () => {
    projectId ? dispatch(putProject(projectId, projectBody)) : dispatch(postProject(projectBody));
    openSharedModal();
  };

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  return (
    <div className={styles.container}>
      {isFetched ? (
        <h2 className={styles.title}>Edit Project</h2>
      ) : (
        <h2 className={styles.title}>Add new project</h2>
      )}
      <h2 className={styles.title}>{formTitle}</h2>
      <Button href="/projects" style="roundedSecondary" disabled={false} text="X" />
      <form className={styles.formContainer} onSubmit={onSubmit}>
        <div className={styles.formDiv}>
          <InputField
            label="Project Name"
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
              <FormEmployee employees={employees} employee={employee} changeValue={onChangeValue} />
            </div>
          );
        })}
        <Button onClick={openModal} style="squaredPrimary" disabled={false} text="Save" />
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
