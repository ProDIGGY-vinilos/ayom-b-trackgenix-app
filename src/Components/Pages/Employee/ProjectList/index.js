import Table from 'Components/Shared/Table';
import React, { useEffect, useState } from 'react';
import { getProjectsByEmployee } from 'redux/projects/thunks';
import { getEmployeeByFirebaseUid } from 'redux/employees/thunks';
import { useDispatch, useSelector } from 'react-redux';
import MessageModal from 'Components/Shared/Modal/MessageModal';
import { auth } from 'Helpers/firebase/index';

const ProjectsPage = () => {
  const userUId = auth.currentUser.uid;
  const token = sessionStorage.getItem('token');
  const [typeModal, setTypeModal] = useState('');
  const [textModal, setTextModal] = useState('');
  const [showModal, setShowModal] = useState(false);
  const { list: projectsList, isLoading, error } = useSelector((state) => state.projects);
  const employee = useSelector((state) => state.employees);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEmployeeByFirebaseUid(userUId, token));
  }, []);

  useEffect(() => {
    const userId = employee.list[0]?._id;
    if (userId) {
      dispatch(getProjectsByEmployee(userId, token));
    }
  }, [employee]);

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
