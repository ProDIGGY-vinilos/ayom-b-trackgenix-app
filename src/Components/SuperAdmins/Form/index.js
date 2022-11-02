import React from 'react';
import { useEffect, useState } from 'react';
import styles from './form.module.css';

function Form() {
  const [sAdmin, savesAdmin] = useState({
    name: '',
    lastName: '',
    email: '',
    password: ''
  });

  useEffect(async () => {
    const path = window.location.pathname.split('/');
    let sAdminId = path[path.length - 1];
    if (sAdminId !== 'super-admin-form') {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/superAdmins/${sAdminId}`);
        const data = await response.json();
        savesAdmin({
          name: data.data.name,
          lastName: data.data.lastName,
          email: data.data.email,
          password: data.data.password
        });
        return;
      } catch (error) {
        alert(error.message);
      }
    }
  }, []);

  const updateField = (e) => {
    savesAdmin({ ...sAdmin, [e.target.name]: e.target.value });
  };
  const updateDeleteSAdmin = async (method, url) => {
    const response = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(sAdmin)
    });
    const data = await response.json();
    alert(data.message);
  };

  const onConfirm = (e) => {
    e.preventDefault();
    const path = window.location.pathname.split('/');
    const sAdminId = path[path.length - 1];
    let url = '';
    if (sAdminId !== 'super-admin-form') {
      url = `${process.env.REACT_APP_API_URL}/superAdmins/${sAdminId}`;
      try {
        updateDeleteSAdmin('PUT', url);
      } catch (error) {
        alert(error.message);
      }
    } else {
      url = `${process.env.REACT_APP_API_URL}/superAdmins`;
      try {
        updateDeleteSAdmin('POST', url);
      } catch (error) {
        alert(error);
      }
    }
    return;
  };
  return (
    <form className={styles.container}>
      <div className={styles.header}>
        <h3>Super admin edit/create</h3>
        <a href="/../super-admins">X</a>
      </div>
      <div className={styles.inputDiv}>
        <label className={styles.labelText}>Name</label>
        <input type="text" name="name" value={sAdmin.name} onChange={updateField} />
      </div>
      <div className={styles.inputDiv}>
        <label className={styles.labelText}>LastName</label>
        <input type="text" name="lastName" value={sAdmin.lastName} onChange={updateField} />
      </div>
      <div className={styles.inputDiv}>
        <label className={styles.labelText}>Email</label>
        <input type="text" name="email" value={sAdmin.email} onChange={updateField} />
      </div>
      <div className={styles.inputDiv}>
        <label className={styles.labelText}>Password</label>
        <input type="text" name="password" value={sAdmin.password} onChange={updateField} />
      </div>
      <div>
        <button onClick={onConfirm}>Confirm</button>
      </div>
    </form>
  );
}

export default Form;
