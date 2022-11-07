/* import styles from './projects.module.css'; */
import { useState, useEffect } from 'react';
/* import List from './List/index'; */
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
    { heading: 'Start Date', value: 'startDate' },
    { heading: 'End Date', value: 'endDate' },
    { heading: 'Actions' }
  ];

  /* const actions = {
    refreshView: onDeleteItem,
    oModal: openModal,
    cModal: closeModal,
    deleteDB: deleteItem
  }; */

  return (
    <section>
      <h2>Projects</h2>
      <Link to="/project-form" className={styles.btnText}>
        <button className={styles.btn}>Add New Project</button>
      </Link>
      <button></button>
      <Table data={projects} columns={columns} deleteItem={deleteItem} />
    </section>
  );

  /* return (
    <section className={styles.container}>
      <h2 className={styles.header}>Projects</h2>
      {projects.length ? (
        <div className={styles.tableContainer}>
          <h3 className={styles.tableTitle}>Current Projects</h3>
          <table className={styles.table}>
            <thead className={styles.tableHeader}>
              <tr>
                <th>Project</th>
                <th>Description</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Client</th>
                <th>Employees</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody className={styles.borderBottom}>
              {projects.map((project) => {
                return <List key={project._id} projectItem={project} onDeleteItem={onDeleteItem} />;
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <p>There are not projects</p>
      )}
      <Link to="/project-form" className={styles.btnText}>
        <button className={styles.btn}>Add New Project</button>
      </Link>
    </section>
  ); */
}

export default Projects;
