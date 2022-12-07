import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MessageModal from 'Components/Shared/Modal/MessageModal';
import styles from 'Components/Admins/admins.module.css';
import Button from 'Components/Shared/Button/Button';
import InputField from 'Components/Shared/Input/input';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { postAdmin, putAdmin } from 'redux/admins/thunks';
import { schema } from 'Components/Admins/validations';
import { joiResolver } from '@hookform/resolvers/joi';
import { reLogin } from 'redux/auth/thunks';

function Form() {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.admins);
  const adminId = useParams().id;
  const adminData = useSelector((state) =>
    state.admins.list.find((admin) => admin._id === adminId)
  );
  const token = sessionStorage.getItem('token');

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

  let data = {
    name: adminData?.name,
    lastName: adminData?.lastName,
    email: adminData?.email,
    password: adminData?.password
  };

  useEffect(() => {
    reset(data);
  }, []);

  useEffect(async () => {
    if (adminId) {
      document.getElementById('fromHeader').innerHTML = 'EDIT ADMIN';
      if (adminData === undefined) {
        fetch(`${process.env.REACT_APP_API_URL}/admins/${adminId}`, {
          headers: {
            token
          }
        })
          .then((response) => response.json())
          .then((response) => {
            data = {
              ...response.data,
              name: response.data.name,
              lastName: response.data.lastName,
              email: response.data.email,
              password: response.data.password
            };
            reset(data);
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

  const onSubmit = (data) => {
    if (adminId) {
      dispatch(putAdmin(data, adminId, token));
      if (!error) {
        dispatch(
          reLogin({
            email: data.email,
            password: data.password
          })
        );
        setTypeModal('Success');
        setTextMessageModal('The administrator was edited successfully');
        openMessageModal();
      }
    } else {
      dispatch(postAdmin(data, token));
      if (!error) {
        setTypeModal('Success');
        setTextMessageModal('The administrator was added successfully');
        openMessageModal();
      }
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.formHeader}>
        <h3 id="fromHeader">Tittle</h3>
        <Button href="/admin/admins" style="roundedSecondary" disabled={false} text="X" />
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
          goBack={'/admin/admins'}
        />
      </div>
      <Button
        onClick={handleSubmit(onSubmit)}
        style="squaredPrimary"
        disabled={false}
        text="Save"
      />
    </form>
  );
}

export default Form;
