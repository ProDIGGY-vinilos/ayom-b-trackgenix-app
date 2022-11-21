import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import styles from 'Components/SuperAdmins/Form/form.module.css';
import InputField from 'Components/Shared/Input/input';
import MessageModal from 'Components/Shared/Modal/MessageModal';
import Button from 'Components/Shared/Button/Button';
import { getSuperAdminsById, postSuperAdmin, putSuperAdmin } from 'redux/superAdmins/thunks';
import { joiResolver } from '@hookform/resolvers/joi';
import schema from 'Components/SuperAdmins/Form/validations';

const Form = () => {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.superAdmins);
  const superAdminId = useParams().id;
  const dataSuperAdmin = useSelector((state) =>
    state.superAdmins.list.find((superAdmins) => superAdmins._id === superAdminId)
  );
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

  const data = {
    name: dataSuperAdmin?.name,
    lastName: dataSuperAdmin?.lastName,
    email: dataSuperAdmin?.email,
    password: dataSuperAdmin?.password
  };

  useEffect(() => {
    if (superAdminId) {
      dispatch(getSuperAdminsById(superAdminId));
    }
  }, []);

  useEffect(() => {
    if (superAdminId) {
      if (dataSuperAdmin !== undefined) {
        reset(data);
      }
    }
  }, [dataSuperAdmin]);

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
    if (superAdminId) {
      dispatch(putSuperAdmin(superAdminId, data));
      setTypeModal('Success');
      setTextModal('SuperAdmin updated successfully');
    } else {
      dispatch(postSuperAdmin(superAdminId, data));
      setTypeModal('Success');
      setTextModal('SuperAdmin created successfully');
    }
    openMessageModal();
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.header}>
        <Button href="/super-admins" style="roundedSecondary" disabled={false} text="X" />
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
