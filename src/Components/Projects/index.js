import { useState, useEffect } from 'react';
import Table from 'Components/Shared/Table';
import styles from 'Components/Projects/projects.module.css';
import MessageModal from 'Components/Shared/Modal/MessageModal';
import Button from 'Components/Shared/Button/Button';
import { useSelector, useDispatch } from 'react-redux';
import { getProjects, deleteProject } from 'redux/projects/thunks';
import LoadingModal from 'Components/Shared/Loading';

const Projects = () => {
  const [typeModal, setTypeModal] = useState('');
  const [textModal, setTextModal] = useState('');
  const [showModal, setShowModal] = useState(false);
  const { list: projectList, isLoading, error } = useSelector((state) => state.projects);
  const dispatch = useDispatch();
  const token = sessionStorage.getItem('token');

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    dispatch(getProjects(token));
  }, []);

  useEffect(() => {
    openModalOnError(error);
  }, [error]);

  const openModalOnError = (error) => {
    if (error) {
      setTypeModal('Error');
      setTextModal(error);
    }
  };

  const deleteItem = async (id) => {
    dispatch(deleteProject(id, token));
    setTypeModal('Success');
    setTextModal(`Project with id:${id} was deleted`);
    openModal();
  };

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
    return <LoadingModal />;
  }
  return (
    <section className={styles.container}>
      {error ? (
        <section className={styles.container}>
          <h2>Projects</h2>
          <h3>Projects not found</h3>
        </section>
      ) : (
        <>
          <h2>Projects</h2>
          <Table
            data={projectList}
            columns={columns}
            deleteItem={deleteItem}
            edit="/admin/project-form"
          />
          <Button href="/admin/project-form" style="roundedPrimary" disabled={false} text="+" />
        </>
      )}
      <MessageModal
        type={typeModal}
        isOpen={showModal}
        message={textModal}
        handleClose={closeModal}
      />
    </section>
  );
};

export default Projects;
