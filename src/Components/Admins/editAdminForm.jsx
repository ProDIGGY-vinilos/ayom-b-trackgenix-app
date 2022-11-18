import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MessageModal from '../Shared/Modal/MessageModal';
import styles from './admins.module.css';
import Button from '../Shared/Button/Button';
import InputField from '../Shared/Input/input';
import { useSelector, useDispatch } from 'react-redux';
import { postAdmin, putAdmin } from '../../redux/admins/thunks';
import { useForm } from 'react-hook-form';
import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';

function Form() {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.admins);
  const adminId = useParams().id;
  const adminData = useSelector((state) =>
    state.admins.list.find((admin) => admin._id === adminId)
  );
  const [inputValue, setInputValue] = useState({
    name: '',
    lastName: '',
    email: '',
    password: ''
  });

  const schema = Joi.object({
    name: Joi.string()
      .required()
      .alphanum()
      .pattern(/^([^0-9]*)$/i, 'only letters'),
    lastName: Joi.string()
      .required()
      .alphanum()
      .pattern(/^([^0-9]*)$/i, 'only letters'),
    email: Joi.string().required(),
    password: Joi.string().alphanum().required()
  });

  const {
    register,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: joiResolver(schema)
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
      if (adminData === undefined) {
        fetch(`${process.env.REACT_APP_API_URL}/admins/${adminId}`)
          .then((response) => response.json())
          .then((response) => {
            setInputValue({
              name: response.data.name,
              lastName: response.data.lastName,
              email: response.data.email,
              password: response.data.password
            });
          });
      } else {
        setInputValue({
          name: adminData.name,
          lastName: adminData.lastName,
          email: adminData.email,
          password: adminData.password
        });
      }
    } else document.getElementById('fromHeader').innerHTML = 'ADD ADMIN';
  }, []);

  useEffect(() => {
    openModalOnError(error);
  }, [error]);

  const openModalOnError = (error) => {
    if (error) {
      setTypeModal('Error');
      setTextMessageModal(error);
      openMessageModal();
    }
  };

  const onChange = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };

  const onSubmit = async () => {
    if (adminId) {
      dispatch(putAdmin(inputValue, adminId));
      if (!error) {
        setTypeModal('Success');
        setTextMessageModal('The administrator was edited successfully');
        openMessageModal();
      }
    } else {
      dispatch(postAdmin(inputValue));
      if (!error) {
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
          register={register}
          error={errors.name?.message}
        />
      </div>
      <div className={styles.fromInput}>
        <InputField
          label="Last Name"
          name="lastName"
          type="text"
          value={inputValue.lastName}
          onChange={onChange}
          register={register}
          error={errors.lastName?.message}
        />
      </div>
      <div className={styles.fromInput}>
        <InputField
          label="Email"
          name="email"
          type="email"
          value={inputValue.email}
          onChange={onChange}
          register={register}
          error={errors.email?.message}
        />
      </div>
      <div className={styles.fromInput}>
        <InputField
          label="Password"
          name="password"
          type="password"
          value={inputValue.password}
          onChange={onChange}
          register={register}
          error={errors.password?.message}
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
