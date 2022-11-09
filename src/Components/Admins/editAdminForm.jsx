import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import MessageModal from '../Shared/Modal/MessageModal';
import styles from './admins.module.css';

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
        <Link to="/admins">X</Link>
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
      <div>
        <MessageModal
          type={typeModal}
          isOpen={showModal}
          message={textModal}
          handleClose={closeModal}
        />
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
