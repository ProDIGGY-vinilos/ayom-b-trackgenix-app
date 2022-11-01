import styles from './projects.module.css';
import { useState, useEffect } from 'react';
import List from './List/index';

function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}api/projects`);
      const data = await response.json();
      setProjects(data.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const onDeleteItem = (id) => {
    setProjects([...projects.filter((projectItem) => projectItem._id !== id)]);
  };

  return (
    <section className={styles.container}>
      <h2 className={styles.header}>Projects</h2>
      {projects.length > 0 ? (
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
      <button className={styles.btn}>
        <a className={styles.btnText} href="/project-form">
          Add New Project
        </a>
      </button>
    </section>
  );
}

export default Projects;
