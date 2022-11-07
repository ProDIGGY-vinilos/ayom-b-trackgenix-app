import React from 'react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from './form.module.css';
import Modal from '../../Shared/Modal';

function Form() {
  const superAdminId = useParams().id;
  const [superAdmin, setSuperAdmin] = useState({
    name: '',
    lastName: '',
    email: '',
    password: ''
  });
  const [title, setTitle] = useState([]);
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
    if (superAdminId) {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/superAdmins/${superAdminId}`
        );
        const data = await response.json();
        setSuperAdmin({
          name: data.data.name,
          lastName: data.data.lastName,
          email: data.data.email,
          password: data.data.password
        });
        setTitle('Super admin edit');
        return;
      } catch (error) {
        setTypeModal('Error');
        setTextModal(error);
        openModal();
        return;
      }
    } else {
      setTitle('Super admin create');
    }
  }, []);

  const updateField = (e) => {
    setSuperAdmin({ ...superAdmin, [e.target.name]: e.target.value });
  };

  const updateCreateSuperAdmin = async (method, url) => {
    setTypeModal(method);
    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(superAdmin)
      });
      const data = await response.json();
      if (response.status === 200 || response.status === 201) {
        setTextModal(data.message);
        openModal();
        return data;
      } else {
        setTypeModal('Error');
        setTextModal(data.message);
        openModal();
        return;
      }
    } catch (error) {
      setTypeModal('Error');
      setTextModal(error);
      openModal();
      return;
    }
  };

  const onConfirm = (e) => {
    e.preventDefault();
    let url = '';
    if (superAdminId) {
      url = `${process.env.REACT_APP_API_URL}/superAdmins/${superAdminId}`;
      try {
        updateCreateSuperAdmin('PUT', url);
      } catch (error) {
        setTypeModal('Error');
        setTextModal(error);
        openModal();
        return;
      }
    } else {
      url = `${process.env.REACT_APP_API_URL}/superAdmins`;
      try {
        updateCreateSuperAdmin('POST', url);
      } catch (error) {
        setTypeModal('Error');
        setTextModal(error);
        openModal();
        return;
      }
    }
    return;
  };
  return (
    <form className={styles.container}>
      <div className={styles.header}>
        <h3>{title}</h3>
        <Link to="/super-admins">X</Link>
      </div>
      <div className={styles.inputDiv}>
        <label className={styles.labelText}>Name</label>
        <input type="text" name="name" value={superAdmin.name} onChange={updateField} />
      </div>
      <div className={styles.inputDiv}>
        <label className={styles.labelText}>LastName</label>
        <input type="text" name="lastName" value={superAdmin.lastName} onChange={updateField} />
      </div>
      <div className={styles.inputDiv}>
        <label className={styles.labelText}>Email</label>
        <input type="text" name="email" value={superAdmin.email} onChange={updateField} />
      </div>
      <div className={styles.inputDiv}>
        <label className={styles.labelText}>Password</label>
        <input type="text" name="password" value={superAdmin.password} onChange={updateField} />
      </div>
      <div>
        <button onClick={onConfirm}>Confirm</button>
      </div>
      <Modal
        type={typeModal}
        isOpen={showModal}
        message={textModal}
        handleClose={closeModal}
        goBack={'/super-admins'}
      />
    </form>
  );
}

export default Form;
