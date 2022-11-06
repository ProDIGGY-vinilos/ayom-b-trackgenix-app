import React from 'react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from './form.module.css';

function Form(props) {
  const superAdminId = useParams().id;
  const [superAdmin, setSuperAdmin] = useState({
    name: '',
    lastName: '',
    email: '',
    password: ''
  });
  const [title, setTitle] = useState([]);

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
        alert(error.message);
      }
    } else {
      setTitle('Super admin create');
    }
  }, []);

  const updateField = (e) => {
    setSuperAdmin({ ...superAdmin, [e.target.name]: e.target.value });
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
      alert(data.message);
      if (response.status === 200 || response.status === 201) {
        props.history.goBack();
      }
    } catch (error) {
      alert(error.message);
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
        alert(error.message);
      }
    } else {
      url = `${process.env.REACT_APP_API_URL}/superAdmins`;
      try {
        updateCreateSuperAdmin('POST', url);
      } catch (error) {
        alert(error);
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
    </form>
  );
}

export default Form;
