import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MessageModal from '../Shared/Modal/MessageModal';
import styles from './employees.module.css';
import Button from '../Shared/Button/Button';
import InputField from '../Shared/Input/input';
import { useSelector, useDispatch } from 'react-redux';
import { postEmployee } from '../../redux/employees/thunks';

const EmployeeForm = () => {
  const dispatch = useDispatch();
  const { error, message } = useSelector((state) => state.employees);
  const employeeId = useParams().id;
  const [userInput, setUserInput] = useState({
    name: '',
    lastName: '',
    phone: '',
    email: '',
    password: ''
  });

  const [typeModal, setTypeModal] = useState('');
  const [textModal, setTextModal] = useState('');
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if (error) {
      setTypeModal('Error');
      setTextModal(error);
      openModal();
    }
  }, [error]);

  useEffect(() => {
    if (message) {
      setTextModal(message);
      openModal();
    }
  }, [message]);

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
    setUserInput({ ...userInput, [name]: value });
  };

  const onSubmit = async () => {
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
    dispatch(postEmployee(url, requestOptions));
  };

  return (
    <>
      <form className={styles.container} onSubmit={onSubmit}>
        <h3 className={styles.titleForm}>Create Employee</h3>
        <Button href="/employees" style="roundedSecondary" disabled={false} text="X" />
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
        <div>
          <MessageModal
            type={typeModal}
            isOpen={showModal}
            message={textModal}
            handleClose={closeModal}
            goBack={'/employees'}
          />
        </div>
        <Button
          onClick={() => {
            onSubmit();
          }}
          style="squaredPrimary"
          disabled={false}
          text="Save"
        />
      </form>
    </>
  );
};

export default EmployeeForm;
