import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './form.module.css';
import MessageModal from '../../Shared/Modal/MessageModal';

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
  const [showMessageModal, setShowMessageModal] = useState(false);

  const openMessageModal = () => {
    setShowMessageModal(true);
  };

  const closeMessageModal = () => {
    setShowMessageModal(false);
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
        openMessageModal();
        return;
      }
    } else {
      setTitle('Super admin create');
    }
  }, []);

  const updateField = (e) => {
    setSuperAdmin({ ...superAdmin, [e.target.name]: e.target.value });
  };

  const validateFields = () => {
    for (const val in superAdmin) {
      if (superAdmin[`${val}`].trim().length !== 0) {
        openMessageModal();
        return;
      } else {
        document.location.href = '/super-admins';
      }
    }
  };

  const updateCreateSuperAdmin = async (method, url) => {
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
        setTypeModal('Success');
        setTextModal(data.message);
        openMessageModal();
        return data;
      } else {
        setTypeModal('Error');
        setTextModal(data.message);
        openMessageModal();
        return;
      }
    } catch (error) {
      setTypeModal('Error');
      setTextModal(error);
      openMessageModal();
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
        openMessageModal();
        return;
      }
    } else {
      url = `${process.env.REACT_APP_API_URL}/superAdmins`;
      try {
        updateCreateSuperAdmin('POST', url);
      } catch (error) {
        setTypeModal('Error');
        setTextModal(error);
        openMessageModal();
        return;
      }
    }
    return;
  };
  return (
    <form className={styles.container}>
      <div className={styles.header}>
        <h3>{title}</h3>
        <a className={styles.crossBtn} onClick={validateFields}>
          X
        </a>
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
      <MessageModal
        type={typeModal}
        isOpen={showMessageModal}
        message={textModal}
        handleClose={closeMessageModal}
        goBack={'/super-admins'}
      />
    </form>
  );
}

export default Form;
