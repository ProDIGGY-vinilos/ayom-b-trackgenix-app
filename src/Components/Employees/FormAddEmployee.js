import React from 'react';
import styles from './employees.module.css';
import { useState } from 'react';

const FormAddEmployee = () => {
  const [userInput, setUserInput] = useState({
    name: '',
    lastName: '',
    phone: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInput((prev) => ({
      ...prev,
      [name]: value
    }));
    console.log(userInput);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(userInput);
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify(userInput)
    };

    fetch(`${process.env.REACT_APP_API_URL}/employees`, requestOptions).then((response) => {
      if (response.status !== 200 || response.status !== 201) {
        return response.json().then(({ message }) => {
          throw new Error(message);
        });
      }
      console.log(response);
      return response.json();
    });
    setUserInput({
      name: '',
      lastName: '',
      phone: '',
      email: '',
      password: ''
    });
  };
  return (
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
      <input type="submit" value="Save Employee" className={styles.btn} />
    </form>
  );
};

export default FormAddEmployee;
