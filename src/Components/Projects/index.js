import { useState, useEffect } from 'react';
import Table from '../Shared/Table';
import { Link } from 'react-router-dom';
import styles from './projects.module.css';
import MessageModal from '../Shared/Modal/MessageModal';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [typeModal, setTypeModal] = useState();
  const [textModal, setTextModal] = useState();
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/projects`);
      const data = await response.json();
      setProjects(data.data);
    } catch (error) {
      setTypeModal('Error');
      setTextModal(error);
      openModal();
      return;
    }
  }, []);

  const onDeleteItem = (id) => {
    setProjects([...projects.filter((projectItem) => projectItem._id !== id)]);
    setTypeModal('Success');
    setTextModal('The project was successfully removed');
    openModal();
  };

  const deleteItem = async (id) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/projects/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json'
      }
    });

    if (response.status === 204) {
      onDeleteItem(id);
    } else if ([400, 404, 500].includes(response.status)) {
      setTypeModal('Error');
      setTextModal('There was an error');
      openModal();
    }
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

  return (
    <section className={styles.container}>
      <h2>Projects</h2>
      <Table data={projects} columns={columns} deleteItem={deleteItem} edit="/project-form" />
      <Link to="/project-form" className={styles.newProject}>
        +
      </Link>
      <MessageModal
        type={typeModal}
        isOpen={showModal}
        message={textModal}
        handleClose={closeModal}
        goBack={'/projects'}
      />
    </section>
  );
};

export default Projects;
