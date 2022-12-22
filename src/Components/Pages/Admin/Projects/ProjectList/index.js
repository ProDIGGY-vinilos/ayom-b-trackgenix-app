import Table from 'Components/Shared/Table';
import React, { useEffect, useState } from 'react';
import { getProjects, deleteProject } from 'redux/projects/thunks';
import { useDispatch, useSelector } from 'react-redux';
import MessageModal from 'Components/Shared/Modal/MessageModal';
import Button from 'Components/Shared/Button/Button';
import styles from 'Components/Pages/Admin/Projects/ProjectList/adminProjectList.module.css';
import LoadingModal from 'Components/Shared/Loading';

const ProjectsPage = () => {
  const token = sessionStorage.getItem('token');
  const [typeModal, setTypeModal] = useState('');
  const [textModal, setTextModal] = useState('');
  const [showModal, setShowModal] = useState(false);
  const { list: projectsList, isLoading, error } = useSelector((state) => state.projects);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProjects(token));
  }, []);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const openModalOnError = (error) => {
    if (error) {
      setTypeModal('Error');
      setTextModal(error);
      openModal();
    }
  };

  const deleteItem = async (id) => {
    dispatch(deleteProject(id, token));
    setTypeModal('Success');
    setTextModal(`Project with id:${id} was deleted`);
    openModal();
  };

  useEffect(() => {
    openModalOnError(error);
  }, [error]);

  const columns = [
    { heading: 'Name', value: 'name' },
    { heading: 'Description', value: 'description' },
    { heading: 'Client', value: 'clientName' },
    { heading: 'Start Date', value: 'startDate', type: 'date' },
    { heading: 'End Date', value: 'endDate', type: 'date' },
    {
      heading: 'Employees',
      value: 'employees',
      array: 'employee',
      nameValue: 'name',
      lastNameValue: 'lastName',
      roleValue: 'role',
      rateValue: 'rate'
    },
    { heading: 'Actions' }
  ];

  if (isLoading) {
    return (
      <section className={styles.container}>
        <LoadingModal />;
      </section>
    );
  }

  return (
    <>
      <div className={styles.container}>
        {!isLoading && projectsList.length ? (
          <Table
            data={projectsList}
            columns={columns}
            deleteItem={deleteItem}
            edit="/admin/project-form"
          />
        ) : (
          <h2>No Projects</h2>
        )}
        <Button href="/admin/project-form" style="roundedPrimary" disabled={false} text="+" />
      </div>
      <MessageModal
        type={typeModal}
        isOpen={showModal}
        message={textModal}
        handleClose={closeModal}
      />
    </>
  );
};

export default ProjectsPage;
