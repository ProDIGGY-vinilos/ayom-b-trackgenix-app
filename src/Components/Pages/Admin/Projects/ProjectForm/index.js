import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FormEmployee from 'Components/Pages/Admin/Projects/ProjectForm/ProjectEmployees';
import DatePicker from 'Components/Shared/Datepicker';
import Modal from 'Components/Shared/Modal/ActionModal';
import MessageModal from 'Components/Shared/Modal/MessageModal';
import styles from 'Components/Projects/Form/form.module.css';
import Button from 'Components/Shared/Button/Button';
import InputField from 'Components/Shared/Input/input';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { schema } from 'Components/Projects/validations';
import { getOneProject, postProject, putProject } from 'redux/projects/thunks';
import { clearError } from 'redux/admins/actions';
import { getEmployees } from 'redux/employees/thunks';
import TextAreaField from 'Components/Shared/TextArea';

const Project = () => {
  const projectId = useParams().id;
  const projectData = useSelector((state) =>
    state.projects.list.find((project) => project._id === projectId)
  );

  const token = sessionStorage.getItem('token');

  const [showModal, setShowModal] = useState(false);
  const [isFetched, setIsFetched] = useState(false);
  const [typeModal, setTypeModal] = useState('');
  const [textModal, setTextModal] = useState('');
  const [showSharedModal, setShowSharedModal] = useState(false);

  const { isLoading, error, message } = useSelector((state) => state.projects);
  const { list: employeesList } = useSelector((state) => state.employees);

  const dispatch = useDispatch();
  const {
    control,
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
    dispatch(clearError());
  };

  const openSharedModal = () => {
    setShowSharedModal(true);
    dispatch(clearError());
  };
  const closeSharedModal = () => {
    setShowSharedModal(false);
    dispatch(clearError());
  };

  const employeesMap = () => {
    projectData?.employees.map((index) => {
      return {
        employee: projectData?.employees[index]?.employee,
        role: projectData?.employees[index]?.role,
        rate: projectData?.employees[index]?.rate
      };
    });
  };

  let projectBodyData = {
    name: projectData?.name,
    description: projectData?.description,
    startDate: projectData?.startDate.substring(0, 10),
    endDate: projectData?.endDate.substring(0, 10),
    clientName: projectData?.clientName,
    employees: employeesMap()
  };

  useEffect(() => {
    dispatch(clearError());
    dispatch(getEmployees(token));
    if (projectId) {
      setIsFetched(true);
      if (projectData === undefined) {
        dispatch(getOneProject(projectId, token));
      } else {
        setIsFetched(false);
      }
    }
  }, []);

  useEffect(() => {
    if (projectId) {
      setIsFetched(true);
      if (projectData !== undefined) {
        projectBodyData = {
          name: projectData?.name,
          description: projectData?.description,
          startDate: projectData?.startDate.substring(0, 10),
          endDate: projectData?.endDate.substring(0, 10),
          clientName: projectData?.clientName,
          employees: projectData?.employees.map((employee) => {
            return {
              employee: employee.employee._id,
              role: employee.role,
              rate: employee.rate
            };
          })
        };
        reset(projectBodyData);
      } else {
        setIsFetched(false);
      }
    }
  }, [projectData]);

  useEffect(() => {
    dispatch(clearError());
    reset(projectBodyData);
  }, []);

  useEffect(() => {
    if (error) {
      setTypeModal('Error');
      setModalMessage(error);
      openSharedModal();
    } else if (message) {
      setTypeModal('Success');
      setModalMessage(error, message);
      openSharedModal();
    }
  }, [error, message]);

  const setModalMessage = (error) => {
    if (error) {
      setTypeModal('Error');
      setTextModal(error);
    } else if (message) {
      setTypeModal('Success');
      setTextModal(message);
    }
  };

  const onSubmit = (data) => {
    projectId ? dispatch(putProject(projectId, data, token)) : dispatch(postProject(data, token));
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
          <TextAreaField
            label="Description"
            name="description"
            placeholder="Project description..."
            register={register}
            columns="30"
            error={errors.description?.message}
          />
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
          <FormEmployee
            control={control}
            employees={employeesList}
            register={register}
            errors={errors}
          />
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
