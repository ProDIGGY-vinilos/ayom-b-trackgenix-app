import { useEffect, useState } from 'react';
import styles from './admins.module.css';

function Form() {
  const [inputValue, setInputValue] = useState({
    name: '',
    lastName: '',
    email: '',
    password: ''
  });

  useEffect(async () => {
    const path = window.location.pathname.split('/');
    const adminId = path[path.length - 1];
    if (adminId !== 'admin-form') {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/admins/${adminId}`);
        const data = await response.json();
        setInputValue({
          name: data.data.name,
          lastName: data.data.lastName,
          email: data.data.email,
          password: data.data.password
        });
        return;
      } catch (err) {
        alert(err.message);
      }
    }
  }, []);

  const onChange = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };

  const onSubmit = async () => {
    const path = window.location.pathname.split('/');
    const adminId = path[path.length - 1];
    if (adminId !== 'admin-form') {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/admins/${adminId}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(inputValue)
      });
      const data = await response.json();
      if (response.status !== 200 && response.status !== 201) {
        alert(data.message);
      } else {
        alert('Admin was successfully edited');
      }
    } else {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/admins/`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(inputValue)
      });
      const data = await response.json();
      if (response.status !== 200 && response.status !== 201) {
        alert(data.message);
      } else {
        alert('Admin was successfully edited');
      }
    }
  };
  return (
    <form className={styles.form}>
      <div className={styles.formHeader}>
        <h3>EDIT ADMIN</h3>
        <a href="/admins">
          <button type="button">X</button>
        </a>
      </div>
      <div className={styles.fromInput}>
        <label>Name</label>
        <input type="text" name="name" value={inputValue.name} onChange={onChange} />
      </div>
      <div className={styles.fromInput}>
        <label>LastName</label>
        <input type="text" name="lastName" value={inputValue.lastName} onChange={onChange} />
      </div>
      <div className={styles.fromInput}>
        <label>Email</label>
        <input type="text" name="email" value={inputValue.email} onChange={onChange} />
      </div>
      <div className={styles.fromInput}>
        <label>Pasasword</label>
        <input type="text" name="password" value={inputValue.password} onChange={onChange} />
      </div>
      <div className={styles.formButton}>
        <button type="button" onClick={onSubmit}>
          Save
        </button>
      </div>
    </form>
  );
}

export default Form;
