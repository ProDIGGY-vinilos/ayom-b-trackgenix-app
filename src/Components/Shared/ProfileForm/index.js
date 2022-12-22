import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { joiResolver } from '@hookform/resolvers/joi';
import Button from 'Components/Shared/Button/Button';
import InputField from 'Components/Shared/Input/input';
import MessageModal from 'Components/Shared/Modal/MessageModal';
import styles from 'Components/Shared/ProfileForm/profileform.module.css';
import { auth } from 'Helpers/firebase/index';
import { EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { clearError } from 'redux/admins/actions';
import LoadingModal from 'Components/Shared/Loading';

const ProfileForm = ({ schema, entity, post, put, getOne, textEdit, textNew, type, href }) => {
  const dispatch = useDispatch();
  const id = useParams().id;
  const userData = useSelector((state) => state[entity].list.find((user) => user._id === id));
  const { error, message, isLoading } = useSelector((state) => state[entity]);

  const token = sessionStorage.getItem('token');

  const [typeModal, setTypeModal] = useState('');
  const [textMessageModal, setTextMessageModal] = useState('');
  const [showMessageModal, setShowMessageModal] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(schema)
  });

  const openMessageModal = () => {
    setShowMessageModal(true);
    dispatch(clearError());
  };

  const closeMessageModal = () => {
    setShowMessageModal(false);
    dispatch(clearError());
  };

  let data = {};
  if (type == 'admin') {
    data = {
      name: userData?.name,
      lastName: userData?.lastName,
      email: userData?.email,
      password: userData?.password
    };
  } else {
    data = {
      name: userData?.name,
      lastName: userData?.lastName,
      email: userData?.email,
      phone: userData?.phone,
      password: userData?.password
    };
  }

  const openModalOnError = (error) => {
    if (error) {
      setTypeModal('Error');
      setTextMessageModal(error);
      openMessageModal();
    }
  };

  useEffect(() => {
    dispatch(clearError());
    reset(data);
  }, []);

  useEffect(() => {
    if (id) {
      document.getElementById('fromHeader').innerHTML = `${textEdit}`;
      if (userData === undefined) {
        dispatch(getOne(id, token));
        reset(data);
      }
    } else document.getElementById('fromHeader').innerHTML = `${textNew}`;
  }, []);

  useEffect(() => {
    openModalOnError(error);
  }, [error]);

  useEffect(() => {
    if (error) {
      setTypeModal('Error');
      setTextMessageModal(error);
      openMessageModal();
    } else if (message) {
      setTypeModal('Success');
      if (id) {
        setTextMessageModal('User Edited');
      } else {
        setTextMessageModal(message);
      }
      openMessageModal();
    }
  }, [error, message]);

  const reAuth = (data) => {
    const user = auth.currentUser;
    const credential = EmailAuthProvider.credential(user.email, data.password);

    reauthenticateWithCredential(user, credential).catch((error) => {
      openModalOnError(error.message);
    });
  };

  const onSubmit = (data) => {
    if (id) {
      dispatch(put(id, data, token));
      if (!error && post === undefined) {
        reAuth(data);
      }
    } else {
      dispatch(post(data, token));
    }
  };

  if (isLoading) {
    return (
      <section className={styles.container}>
        <LoadingModal />;
      </section>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.formHeader}>
        <h3 id="fromHeader">Title</h3>
      </div>
      <div className={styles.fromInput}>
        <InputField
          label="Name"
          name="name"
          type="text"
          register={register}
          error={errors.name?.message}
        />
      </div>
      <div className={styles.fromInput}>
        <InputField
          label="Last Name"
          name="lastName"
          type="text"
          register={register}
          error={errors.lastName?.message}
        />
      </div>
      <div className={styles.fromInput}>
        <InputField
          label="Email"
          name="email"
          type="email"
          register={register}
          error={errors.email?.message}
        />
      </div>
      {type == 'employee' ? (
        <div className={styles.fromInput}>
          <InputField
            label="Phone Number"
            name="phone"
            type="text"
            placeholder="Phone Number"
            register={register}
            error={errors.phone?.message}
          />
        </div>
      ) : null}
      <div className={styles.fromInput}>
        <InputField
          label="Password"
          name="password"
          type="password"
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
          goBack={href}
        />
      </div>
      <div className={styles.buttons}>
        <Button href={href} style="squaredSecondary" disabled={false} text="Back" />
        <Button
          onClick={handleSubmit(onSubmit)}
          style="squaredPrimary"
          disabled={false}
          text="Save"
        />
      </div>
    </form>
  );
};

export default ProfileForm;
