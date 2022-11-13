import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MessageModal from '../Shared/Modal/MessageModal';
import styles from './admins.module.css';
import Button from '../Shared/Button/Button';
import InputField from '../Shared/Input/input';
import { useSelector, useDispatch } from 'react-redux';
import { postAdmins, putAdmins } from '../../redux/admins/thunks';

function Form() {
  const { error } = useSelector((state) => state.admins);
  const dispatch = useDispatch();
  const adminId = useParams().id;

  const [inputValue, setInputValue] = useState({
    name: '',
    lastName: '',
    email: '',
    password: ''
  });

  const [typeModal, setTypeModal] = useState();
  const [textMessageModal, setTextMessageModal] = useState();
  const [showMessageModal, setShowMessageModal] = useState(false);

  const openMessageModal = () => {
    setShowMessageModal(true);
  };

  const closeMessageModal = () => {
    setShowMessageModal(false);
  };

  useEffect(async () => {
    if (adminId) {
      document.getElementById('fromHeader').innerHTML = 'EDIT ADMIN';
    } else document.getElementById('fromHeader').innerHTML = 'ADD ADMIN';
  }, []);

  const onChange = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };

  const onSubmit = async () => {
    if (adminId) {
      dispatch(putAdmins(inputValue, adminId));
      if (error) {
        setTypeModal('Error');
        setTextMessageModal(error);
        openMessageModal();
        return;
      } else {
        setTypeModal('Success');
        setTextMessageModal('The administrator was edited successfully');
        openMessageModal();
      }
    } else {
      dispatch(postAdmins(inputValue));
      if (error) {
        setTypeModal('Error');
        setTextMessageModal(error);
        openMessageModal();
        return;
      } else {
        setTypeModal('Success');
        setTextMessageModal('The administrator was added successfully');
        openMessageModal();
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
          isOpen={showMessageModal}
          message={textMessageModal}
          handleClose={closeMessageModal}
          goBack={'/admins'}
        />
      </div>
      <Button onClick={onSubmit} style="squaredPrimary" disabled={false} text="Save" />
    </form>
  );
}

export default Form;
