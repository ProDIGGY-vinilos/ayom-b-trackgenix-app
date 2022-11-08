import { useState, useEffect } from 'react';
import Table from '../Shared/Table';
import { Link } from 'react-router-dom';
import styles from './projects.module.css';

function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/projects`);
      const data = await response.json();
      setProjects(data.data);
    } catch (error) {
      alert(error);
    }
  }, []);

  const onDeleteItem = (id) => {
    setProjects([...projects.filter((projectItem) => projectItem._id !== id)]);
  };

  const deleteItem = async (id) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/projects/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json'
      }
    });
    const data = await response.json();

    if (response.status === 200) {
      onDeleteItem(id);
      alert(data.msg);
    } else if ([404, 500].includes(response.status)) {
      alert(data.msg);
    } else if (response.status === 400) {
      alert(data.message);
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
    </section>
  );
}

export default Projects;
