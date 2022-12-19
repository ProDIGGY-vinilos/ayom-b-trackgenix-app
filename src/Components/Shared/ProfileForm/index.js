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

const ProfileForm = ({
  schema,
  entity,
  post,
  put,
  getById,
  textEdit,
  textNew,
  textEditSuccess,
  textNewSuccess,
  type,
  href
}) => {
  const dispatch = useDispatch();
  const id = useParams().id;
  const userData = useSelector((state) => state[entity].list.find((user) => user._id === id));
  const { error } = useSelector((state) => state[entity]);

  const token = sessionStorage.getItem('token');

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

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    mode: 'onChange',
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

  useEffect(() => {
    reset(data);
  }, []);

  useEffect(async () => {
    if (id) {
      document.getElementById('fromHeader').innerHTML = `${textEdit}`;
      if (userData === undefined) {
        dispatch(getById(id, token));
        reset(data);
      }
    } else document.getElementById('fromHeader').innerHTML = `${textNew}`;
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

  const reAuth = (data) => {
    const user = auth.currentUser;
    const credential = EmailAuthProvider.credential(user.email, data.password);

    reauthenticateWithCredential(user, credential).catch((error) => {
      openModalOnError(error);
    });
  };

  const onSubmit = (data) => {
    if (id) {
      dispatch(put(data, id, token));
      if (!error) {
        reAuth(data);
        setTypeModal('Success');
        setTextMessageModal(`${textEditSuccess}`);
        openMessageModal();
      }
    } else {
      dispatch(post(data, token));
      if (!error) {
        setTypeModal('Success');
        setTextMessageModal(`${textNewSuccess}`);
        openMessageModal();
      }
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.formHeader}>
        <h3 id="fromHeader">Tittle</h3>
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
        <InputField
          name="phone"
          type="text"
          placeholder="Phone Number"
          register={register}
          error={errors.phone?.message}
        />
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
