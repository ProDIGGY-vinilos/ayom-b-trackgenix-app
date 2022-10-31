import { useEffect, useState } from 'react';
import styles from './admins.module.css';

function Form() {
  const [nameValue, setNameValue] = useState({
    name: '',
    lastName: '',
    email: '',
    password: ''
  });

  useEffect(async () => {
    const paramas = new URLSearchParams(window.location.search);
    const clientID = paramas.get('id');
    if (clientID !== null) {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/admins/${clientID}`);
        const data = await response.json();
        setNameValue({
          name: data.data.name,
          lastName: data.data.lastName,
          email: data.data.email,
          password: data.data.password
        });
        return;
      } catch (err) {
        console.error(err);
      }
    }
  }, []);

  const onChange = (e) => {
    setNameValue({ ...nameValue, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const paramas = new URLSearchParams(window.location.search);
    const clientID = paramas.get('id');
    if (clientID !== null) {
      const options = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(nameValue)
      };
      const url = `${process.env.REACT_APP_API_URL}/admins/${clientID}`;
      fetch(url, options).then(async (response) => {
        if (response.status !== 200 && response.status !== 201) {
          const { message } = await response.json();
          setTimeout(() => {
            alert(message);
          }, 10);
        } else {
          return response.json();
        }
      });
    } else {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(nameValue)
      };
      const url = `${process.env.REACT_APP_API_URL}/admins`;
      fetch(url, options).then(async (response) => {
        console.log('STATUS', response.status);
        if (response.status !== 200 && response.status !== 201) {
          const { message } = await response.json();
          setTimeout(() => {
            alert(message);
          }, 10);
        } else {
          return response.json();
        }
      });
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
        <input type="text" name="name" value={nameValue.name} onChange={onChange} />
      </div>
      <div className={styles.fromInput}>
        <label>LastName</label>
        <input type="text" name="lastName" value={nameValue.lastName} onChange={onChange} />
      </div>
      <div className={styles.fromInput}>
        <label>Email</label>
        <input type="text" name="email" value={nameValue.email} onChange={onChange} />
      </div>
      <div className={styles.fromInput}>
        <label>Pasasword</label>
        <input type="text" name="password" value={nameValue.password} onChange={onChange} />
      </div>
      <div className={styles.formButton}>
        <button type="submit" onClick={onSubmit}>
          Save
        </button>
      </div>
    </form>
  );
}

export default Form;
