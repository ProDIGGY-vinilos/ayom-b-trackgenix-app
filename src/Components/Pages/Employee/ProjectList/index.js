import Table from 'Components/Shared/Table';
import React, { useEffect, useState } from 'react';
import { getProjectsByEmployee } from 'redux/projects/thunks';
import { useDispatch, useSelector } from 'react-redux';
import MessageModal from 'Components/Shared/Modal/MessageModal';

const ProjectsPage = () => {
  const userId = '60e8b1b0e2b5a40015b0c1b';
  const token = sessionStorage.getItem('token');
  const [typeModal, setTypeModal] = useState('');
  const [textModal, setTextModal] = useState('');
  const [showModal, setShowModal] = useState(false);
  const { list: projectsList, isLoading, error } = useSelector((state) => state.projects);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProjectsByEmployee(userId, token));
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

  useEffect(() => {
    openModalOnError(error);
  }, [error]);

  const columns = [
    { heading: 'Name', value: 'name' },
    { heading: 'Description', value: 'description' },
    { heading: 'Client', value: 'clientName' },
    { heading: 'Start Date', value: 'startDate', type: 'date' },
    { heading: 'End Date', value: 'endDate', type: 'date' }
  ];

  return (
    <>
      {isLoading && <h2>Loading...</h2>}
      {!isLoading && projectsList.length ? (
        <Table data={projectsList} columns={columns} />
      ) : (
        <h2>No Projects</h2>
      )}
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
