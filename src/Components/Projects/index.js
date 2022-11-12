import { useState, useEffect } from 'react';
import Table from '../Shared/Table';
import styles from './projects.module.css';
import MessageModal from '../Shared/Modal/MessageModal';
import Button from '../Shared/Button/Button';
import { useSelector, useDispatch } from 'react-redux';
import { getProjects } from '../../redux/projects/thunks';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [typeModal, setTypeModal] = useState();
  const [textModal, setTextModal] = useState();
  const [showModal, setShowModal] = useState(false);
  const { list: projectList, isLoading, error } = useSelector((state) => state.Projects);
  const dispatch = useDispatch();

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(async () => {
    dispatch(getProjects());
  }, []);

  useEffect(async () => {
    openModalOnError(error);
  }, [error]);

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

  if (isLoading) {
    return <h3>Loading...</h3>;
  }
  const openModalOnError = (error) => {
    if (error) {
      setTypeModal('Error');
      setTextModal(error);
      openModal();
    }
  };

  return (
    <section className={styles.container}>
      {error ? (
        <h3>ERROR</h3>
      ) : (
        <>
          <h2>Projects</h2>
          <Table
            data={projectList}
            columns={columns}
            deleteItem={deleteItem}
            edit="/project-form"
          />
          <Button href="/project-form" style="roundedPrimary" disabled={false} text="+" />
        </>
      )}
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
