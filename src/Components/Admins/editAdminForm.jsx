import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MessageModal from '../Shared/Modal/MessageModal';
import styles from './admins.module.css';
import Button from '../Shared/Button/Button';
import InputField from '../Shared/Input/input';

function Form() {
  const adminId = useParams().id;

  const [inputValue, setInputValue] = useState({
    name: '',
    lastName: '',
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
    if (adminId) {
      document.getElementById('fromHeader').innerHTML = 'EDIT ADMIN';
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
        setTypeModal('Error');
        setTextModal(err.message);
        openModal();
        return;
      }
    } else document.getElementById('fromHeader').innerHTML = 'ADD ADMIN';
  }, []);

  const onChange = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };

  const onSubmit = async () => {
    if (adminId) {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/admins/${adminId}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(inputValue)
      });
      const data = await response.json();
      if (response.status !== 200 && response.status !== 201) {
        setTypeModal('Error');
        setTextModal(data.message);
        openModal();
        return;
      } else {
        setTypeModal('Success');
        setTextModal(data.message);
        openModal();
        return data;
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
        setTypeModal('Error');
        setTextModal(data.message);
        openModal();
        return;
      } else {
        setTypeModal('Success');
        setTextModal(data.message);
        openModal();
        return data;
      }
    }
  };
  return (
    <form className={styles.form}>
      <div className={styles.formHeader}>
        <h3 id="fromHeader">Tittle</h3>
        <Button href="/admins" style="roundedSecondary" disabled={false} text="X" />
      </div>
      <div className={styles.fromInput}>
        <InputField
          label="Name"
          name="name"
          type="text"
          value={inputValue.name}
          onChange={onChange}
        />
      </div>
      <div className={styles.fromInput}>
        <InputField
          label="Last Name"
          name="lastName"
          type="text"
          value={inputValue.lastName}
          onChange={onChange}
        />
      </div>
      <div className={styles.fromInput}>
        <InputField
          label="Email"
          name="email"
          type="email"
          value={inputValue.email}
          onChange={onChange}
        />
      </div>
      <div className={styles.fromInput}>
        <InputField
          label="Password"
          name="password"
          type="password"
          value={inputValue.password}
          onChange={onChange}
        />
      </div>
      <div>
        <MessageModal
          type={typeModal}
          isOpen={showModal}
          message={textModal}
          handleClose={closeModal}
          goBack={'/admins'}
        />
      </div>
      <Button onClick={onSubmit} style="squaredPrimary" disabled={false} text="Save" />
    </form>
  );
}

export default Form;
