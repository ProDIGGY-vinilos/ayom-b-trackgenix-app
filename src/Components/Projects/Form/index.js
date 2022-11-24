import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FormEmployee from 'Components/Projects/Form/FormEmployees/index';
import DatePicker from 'Components/Shared/Datepicker';
import Modal from 'Components/Shared/Modal/ActionModal';
import MessageModal from 'Components/Shared/Modal/MessageModal';
import styles from 'Components/Projects/Form/form.module.css';
import Button from 'Components/Shared/Button/Button';
import InputField from 'Components/Shared/Input/input';
import TextAreaField from 'Components/Shared/TextArea';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { schema } from 'Components/Projects/validations';
import { getOneProject, postProject, putProject } from 'redux/projects/thunks';
import { getEmployees } from 'redux/employees/thunks';

const Project = () => {
  const projectId = useParams().id;
  const projectData = useSelector((state) =>
    state.projects.list.find((project) => project._id === projectId)
  );

  const [showModal, setShowModal] = useState(false);
  const [isFetched, setIsFetched] = useState(false);
  const [typeModal, setTypeModal] = useState('');
  const [textModal, setTextModal] = useState('');
  const [showSharedModal, setShowSharedModal] = useState(false);

  const { isLoading, error } = useSelector((state) => state.projects);
  const { list: employeesList } = useSelector((state) => state.employees);

  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(schema)
  });

  const openModal = () => {
    let errorsSize = Object.keys(errors).length;
    if (errorsSize === 0) {
      setShowModal(true);
    }
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

  let projectBodyData = {
    name: projectData?.name,
    description: projectData?.description,
    startDate: projectData?.startDate.substring(0, 10),
    endDate: projectData?.endDate.substring(0, 10),
    clientName: projectData?.clientName,
    employees: [
      {
        employee: projectData?.employees[0].employee._id,
        role: projectData?.employees[0].role,
        rate: projectData?.employees[0].rate
      }
    ]
  };

  useEffect(() => {
    dispatch(getEmployees());
    if (projectId) {
      setIsFetched(true);
      if (projectData === undefined) {
        dispatch(getOneProject(projectId));
      } else {
        setIsFetched(false);
      }
    }
  }, []);

  useEffect(() => {
    dispatch(getEmployees());
    if (projectId) {
      setIsFetched(true);
      if (projectData !== undefined) {
        projectBodyData = {
          name: projectData?.name,
          description: projectData?.description,
          startDate: projectData?.startDate.substring(0, 10),
          endDate: projectData?.endDate.substring(0, 10),
          clientName: projectData?.clientName,
          employees: [
            {
              employee: projectData?.employees[0]?.employee._id,
              role: projectData?.employees[0]?.role,
              rate: projectData?.employees[0]?.rate
            }
          ]
        };
        reset(projectBodyData);
      } else {
        setIsFetched(false);
      }
    }
  }, [projectData]);

  useEffect(() => {
    reset(projectBodyData);
  }, []);

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

  const onSubmit = (data) => {
    projectId ? dispatch(putProject(projectId, data)) : dispatch(postProject(data));
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
      <Button href="/admin/projects" style="roundedSecondary" disabled={false} text="X" />
      <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formDiv}>
          <InputField
            label="Project Name"
            name="name"
            type="text"
            placeholder="project name"
            register={register}
            error={errors.name?.message}
          />
        </div>
        <div className={styles.formDiv}>
          <InputField
            label="Client Name"
            name="clientName"
            type="text"
            placeholder="client name"
            register={register}
            error={errors.clientName?.message}
          />
        </div>
        <div className={styles.formFull}>
          <label>Description</label>
          <TextAreaField
            className={styles.textarea}
            name="description"
            placeholder="Description"
            register={register}
            columns="100"
          />
          {errors.description && <p>{errors.description.message}</p>}
        </div>
        <div className={styles.formDiv}>
          <DatePicker
            inputName="startDate"
            label="Start date"
            register={register}
            error={errors.startDate?.message}
          />
        </div>
        <div className={styles.formDiv}>
          <DatePicker
            inputName="endDate"
            label="End date"
            register={register}
            error={errors.endDate?.message}
          />
        </div>
        <h4 className={styles.formFull}>Employees: </h4>
        <div className={`${styles.formFull} ${styles.employeesDiv}`}>
          <FormEmployee employees={employeesList} register={register} errors={errors} />
        </div>
        <Button onClick={openModal} style="squaredPrimary" disabled={false} text="Save" />
      </form>
      <MessageModal
        type={typeModal}
        isOpen={showSharedModal}
        message={textModal}
        handleClose={closeSharedModal}
        goBack={'/admin/projects'}
      />
      <Modal
        showModal={showModal}
        closeModal={closeModal}
        title={isFetched ? 'Update Project' : 'Add New Project'}
        message={
          isFetched
            ? `Are you sure you want to update the project?`
            : `Are you sure you want to add the project?`
        }
        confirmAction={handleSubmit(onSubmit)}
        id={projectId}
        declineButtonText="Cancel"
        confirmButtonText="Confirm"
      />
    </div>
  );
};

export default Project;
