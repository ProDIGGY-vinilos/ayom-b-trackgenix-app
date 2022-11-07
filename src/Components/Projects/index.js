import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './projects.module.css';
import List from './List/index';
import Modal from '../Shared/Modal';

function Projects() {
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
    setTypeModal('DELETE');
    setTextModal('The project was successfully removed');
    openModal();
  };

  return (
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
      <Modal
        type={typeModal}
        isOpen={showModal}
        message={textModal}
        handleClose={closeModal}
        goBack={'/projects'}
      />
    </section>
  );
}

export default Projects;
