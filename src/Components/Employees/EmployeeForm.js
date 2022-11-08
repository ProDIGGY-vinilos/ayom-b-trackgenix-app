import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './employees.module.css';
import Button from './Button';
import InputField from '../Shared/Input/input';

const EmployeeForm = () => {
  const employeeId = useParams().id;
  const [userInput, setUserInput] = useState({
    name: '',
    lastName: '',
    phone: '',
    email: '',
    password: ''
  });

  useEffect(async () => {
    if (employeeId) {
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
    setUserInput({ ...userInput, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const requestOptions = {
      method: !employeeId ? 'POST' : 'PUT',
      body: JSON.stringify(userInput),
      headers: {
        'Content-Type': 'application/json'
      }
    };
    let url = !employeeId ? '' : '/' + employeeId;
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/employees${url}`,
      requestOptions
    );
    const data = await response.json();
    alert(data.message);
  };

  return (
    <>
      <form className={styles.container} onSubmit={onSubmit}>
        <h3 className={styles.titleForm}>Create Employee</h3>
        <div className={styles.formControl}>
          <InputField
            label="Name"
            name="name"
            type="text"
            placeholder="name"
            value={userInput.name}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formControl}>
          <InputField
            label="Last Name"
            name="lastName"
            type="text"
            placeholder="last name"
            value={userInput.lastName}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formControl}>
          <InputField
            label="Email"
            name="email"
            type="mail"
            placeholder="email"
            value={userInput.email}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formControl}>
          <InputField
            label="Phone Number"
            name="phone"
            type="number"
            placeholder="phone"
            value={userInput.phone}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formControl}>
          <InputField
            label="Password"
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
