import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MessageModal from '../Shared/Modal/MessageModal';
import styles from './employees.module.css';
import Button from './Button';

const EmployeeForm = () => {
  const employeeId = useParams().id;
  const [userInput, setUserInput] = useState({
    name: '',
    lastName: '',
    phone: '',
    email: '',
    password: ''
  });

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
        setTypeModal('Error');
        setTextModal(err.message);
        openModal();
        return;
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
    let requestOptions;

    if (employeeId) {
      requestOptions = {
        method: 'PUT',
        body: JSON.stringify(userInput),
        headers: {
          'Content-Type': 'application/json'
        }
      };
      setTypeModal('Success');
    } else {
      requestOptions = {
        method: 'POST',
        body: JSON.stringify(userInput),
        headers: {
          'Content-Type': 'application/json'
        }
      };
      setTypeModal('Success');
    }

    let url = !employeeId ? '' : '/' + employeeId;
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/employees${url}`,
        requestOptions
      );
      const data = await response.json();
      if (response.status !== 200 && response.status !== 201 && response.status !== 204) {
        setTypeModal('Error');
        setTextModal(data.message);
        openModal();
        return;
      }
      setTextModal(data.message);
      openModal();
      return data;
    } catch (error) {
      setTypeModal('Error');
      setTextModal(error);
      openModal();
      return;
    }
  };

  return (
    <>
      <form className={styles.container} onSubmit={onSubmit}>
        <h3 className={styles.titleForm}>Create Employee</h3>
        <div className={styles.formControl}>
          <label>Name</label>
          <input
            name="name"
            type="text"
            placeholder="name"
            value={userInput.name}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formControl}>
          <label>Last Name</label>
          <input
            name="lastName"
            type="text"
            placeholder="last name"
            value={userInput.lastName}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formControl}>
          <label>Email</label>
          <input
            name="email"
            type="mail"
            placeholder="email"
            value={userInput.email}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formControl}>
          <label>Phone Number</label>
          <input
            name="phone"
            type="number"
            placeholder="phone"
            value={userInput.phone}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formControl}>
          <label>Password</label>
          <input
            name="password"
            type="password"
            placeholder="password"
            value={userInput.password}
            onChange={handleChange}
          />
        </div>
        <div>
          <MessageModal
            type={typeModal}
            isOpen={showModal}
            message={textModal}
            handleClose={closeModal}
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
