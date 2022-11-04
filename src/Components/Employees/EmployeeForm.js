import React from 'react';
import styles from './employees.module.css';
import { useEffect, useState } from 'react';
import Button from './Button';

const path = window.location.pathname.split('/');
let employeeId = path[path.length - 1];

const EmployeeForm = () => {
  const [userInput, setUserInput] = useState({
    name: '',
    lastName: '',
    phone: '',
    email: '',
    password: ''
  });

  useEffect(async () => {
    if (employeeId !== 'employee-form') {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/employees/${employeeId}`);
        const data = await response.json();
        setUserInput({
          name: data.data.name,
          lastName: data.data.lastName,
          email: data.data.email,
          phone: data.data.phone,
          password: data.data.password
        });
        return;
      } catch (err) {
        alert(err.message);
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInput((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const requestOptions = {
      method: employeeId === 'employee-form' ? 'POST' : 'PUT',
      body: JSON.stringify(userInput),
      headers: {
        'Content-Type': 'application/json'
      }
    };
    let url = employeeId === 'employee-form' ? '' : '/' + employeeId;

    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/employees${url}`,
      requestOptions
    );
    const data = await response.json();
    alert(data.message);
  };

  return (
    <>
      <form className={styles.addform} onSubmit={onSubmit}>
        <div className={styles.formcontrol}>
          <label>Name</label>
          <input
            name="name"
            type="text"
            placeholder="name"
            value={userInput.name}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formcontrol}>
          <label>Last Name</label>
          <input
            name="lastName"
            type="text"
            placeholder="last name"
            value={userInput.lastName}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formcontrol}>
          <label>Email</label>
          <input
            name="email"
            type="mail"
            placeholder="email"
            value={userInput.email}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formcontrol}>
          <label>Phone Number</label>
          <input
            name="phone"
            type="number"
            placeholder="phone"
            value={userInput.phone}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formcontrol}>
          <label>Password</label>
          <input
            name="password"
            type="password"
            placeholder="password"
            value={userInput.password}
            onChange={handleChange}
          />
        </div>
        <div className={styles.divBtn}>
          <button
            type="submit"
            value="Save Employee"
            className={styles.btn}
            onClick={(e) => {
              onSubmit(e);
            }}
          >
            Confirm
          </button>
        </div>
      </form>
      <Button color="black" text={'back'} href={'/employees'} />
    </>
  );
};

export default EmployeeForm;
