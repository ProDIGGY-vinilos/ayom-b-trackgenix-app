import styles from './projects.module.css';
import { useState, useEffect } from 'react';
/* import Form from './Form/index'; */
import List from './List/index';

function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}api/projects`);
      const data = await response.json();
      console.log(data);
      setProjects(data.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  //DELETE VIEW ITEM
  const onDeleteItem = (id) => {
    setProjects([...projects.filter((projectItem) => projectItem._id !== id)]);
  };

  return (
    <section className={styles.container}>
      <h2 className={styles.header}>Projects</h2>
      <button>
        <a href="/project-form">Add New Project</a>
      </button>
      {projects.length > 0 ? (
        <div className={styles.tableContainer}>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Client</th>
                <th>Employees</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => {
                return <List key={project._id} projectItem={project} onDeleteItem={onDeleteItem} />;
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <p>There are not projects</p>
      )}
    </section>
  );
}

export default Projects;
