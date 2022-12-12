import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MessageModal from 'Components/Shared/Modal/MessageModal';
import styles from 'Components/Admins/admins.module.css';
import Button from 'Components/Shared/Button/Button';
import InputField from 'Components/Shared/Input/input';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { postSuperAdmin, putSuperAdmin } from 'redux/superAdmins/thunks';
import { schema } from 'Components/Admins/validations';
import { joiResolver } from '@hookform/resolvers/joi';
import { auth } from 'Helpers/firebase/index';
import { onIdTokenChanged } from 'firebase/auth';
import { loginSuccess, logoutSuccess } from 'redux/auth/actions';

function Form() {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.superAdmins);
  const superAdminId = useParams().id;
  const superAdminData = useSelector((state) =>
    state.superAdmins.list.find((superAdmin) => superAdmin._id === superAdminId)
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
    name: superAdminData?.name,
    lastName: superAdminData?.lastName,
    email: superAdminData?.email,
    password: superAdminData?.password
  };

  useEffect(() => {
    reset(data);
  }, []);

  useEffect(async () => {
    if (superAdminId) {
      document.getElementById('fromHeader').innerHTML = 'EDIT PROFILE';
      if (superAdminData === undefined) {
        fetch(`${process.env.REACT_APP_API_URL}/superAdmins/${superAdminId}`, {
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
    } else document.getElementById('fromHeader').innerHTML = 'ADD SUPER ADMIN';
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

  const getNewToken = async () => {
    await auth.currentUser.getIdToken(true);
    await onIdTokenChanged(auth, async (user) => {
      if (user) {
        try {
          const {
            token,
            claims: { role, email }
          } = await user.getIdTokenResult();
          if (token) {
            dispatch(
              loginSuccess({
                role,
                email
              })
            );
            sessionStorage.setItem('token', token);
          }
        } catch (error) {
          alert('Error', error);
        }
      } else {
        dispatch(logoutSuccess());
      }
    });
  };

  const onSubmit = async (data) => {
    if (superAdminId) {
      dispatch(putSuperAdmin(data, superAdminId, token));
      if (!error) {
        setTypeModal('Success');
        setTextMessageModal('The administrator was edited successfully');
        openMessageModal();
      }
    } else {
      dispatch(postSuperAdmin(data, token));
      if (!error) {
        setTypeModal('Success');
        setTextMessageModal('The administrator was added successfully');
        openMessageModal();
      }
    }
    await getNewToken();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.formHeader}>
        <h3 id="fromHeader">Title</h3>
        <Button href="/super-admin/profile" style="roundedSecondary" disabled={false} text="X" />
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
          goBack={'/super-admin/profile'}
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
