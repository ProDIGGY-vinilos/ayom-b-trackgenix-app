import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import styles from 'Components/SuperAdmins/Form/form.module.css';
import InputField from 'Components/Shared/Input/input';
import MessageModal from 'Components/Shared/Modal/MessageModal';
import Button from 'Components/Shared/Button/Button';
import { postSuperAdmin, putSuperAdmin } from 'redux/superAdmins/thunks';
import { joiResolver } from '@hookform/resolvers/joi';
import schema from 'Components/SuperAdmins/Form/validations';

const Form = () => {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.superAdmins);
  const superAdminId = useParams().id;
  const [title, setTitle] = useState([]);
  const [typeModal, setTypeModal] = useState('');
  const [textModal, setTextModal] = useState('');
  const [showMessageModal, setShowMessageModal] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({ mode: 'onChange', resolver: joiResolver(schema) });

  const openMessageModal = () => {
    setShowMessageModal(true);
  };

  const closeMessageModal = () => {
    setShowMessageModal(false);
  };

  useEffect(async () => {
    if (superAdminId) {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/superAdmins/${superAdminId}`
        );
        const data = await response.json();
        const fetchData = {
          ...response.data,
          name: data.data.name,
          lastName: data.data.lastName,
          email: data.data.email,
          password: data.data.password
        };
        setTitle('Super admin edit');
        reset(fetchData);
        return;
      } catch (error) {
        setTypeModal('Error');
        setTextModal('error');
        openMessageModal();
        return;
      }
    } else {
      setTitle('Super admin create');
    }
  }, []);

  const validateFields = (data) => {
    for (const val in data) {
      if (data[`${val}`].trim().length !== 0) {
        openMessageModal();
        return;
      } else {
        document.location.href = '/super-admins';
      }
    }
  };

  useEffect(() => {
    openModalOnError(error);
  }, [error]);

  const openModalOnError = (error) => {
    if (error) {
      setTypeModal('Error');
      setTextModal(error);
      openMessageModal();
    }
  };

  const onSubmit = (data) => {
    let url = '';
    if (superAdminId) {
      url = `${process.env.REACT_APP_API_URL}/superAdmins/${superAdminId}`;
      dispatch(putSuperAdmin(url, data));
      setTypeModal('Success');
      setTextModal('SuperAdmin updated successfully');
      openMessageModal();
    } else {
      url = `${process.env.REACT_APP_API_URL}/superAdmins`;
      dispatch(postSuperAdmin(url, data));
      setTypeModal('Success');
      setTextModal('SuperAdmin created successfully');
      openMessageModal();
    }
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.header}>
        <h3>{title}</h3>
        <Button onClick={validateFields} style="roundedSecondary" disabled={false} text="X" />
      </div>
      <div className={styles.inputDiv}>
        <InputField
          label="Name"
          name="name"
          type="text"
          placeholder="name"
          register={register}
          error={errors.name?.message}
        />
      </div>
      <div className={styles.inputDiv}>
        <InputField
          label="Last Name"
          name="lastName"
          type="text"
          placeholder="last name"
          register={register}
          error={errors.lastName?.message}
        />
      </div>
      <div className={styles.inputDiv}>
        <InputField
          label="Email"
          name="email"
          type="email"
          placeholder="email"
          register={register}
          error={errors.email?.message}
        />
      </div>
      <div className={styles.inputDiv}>
        <InputField
          label="Password"
          name="password"
          type="password"
          placeholder="password"
          register={register}
          error={errors.password?.message}
        />
      </div>
      <Button
        onClick={handleSubmit(onSubmit)}
        style="squaredPrimary"
        disabled={false}
        text="Save"
      />
      <MessageModal
        type={typeModal}
        isOpen={showMessageModal}
        message={textModal}
        handleClose={closeMessageModal}
        goBack={'/super-admins'}
      />
    </form>
  );
};
export default Form;
