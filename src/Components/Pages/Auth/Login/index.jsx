import styles from 'Components/Pages/Auth/Login/login.module.css';
import InputField from 'Components/Shared/Input/input';
import Button from 'Components/Shared/Button/Button';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { joiResolver } from '@hookform/resolvers/joi';
import { schema } from 'Components/Pages/Auth/Login/validations';
import MessageModal from 'Components/Shared/Modal/MessageModal';
import { login } from 'redux/auth/thunks';

const Login = (props) => {
  const dispatch = useDispatch();
  const { isLoading, error, role } = useSelector((state) => state.auth);
  const [typeModal, setTypeModal] = useState('');
  const [textModal, setTextModal] = useState('');
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    if (!error) {
      switch (role) {
        case 'EMPLOYEE':
          props.history.push('/employee');
          break;
        case 'ADMIN':
          props.history.push('/admin');
          break;
        case 'SUPER_ADMIN':
          props.history.push('/super-admin');
          break;
      }
    }
  };

  const openModalOnError = (error) => {
    if (error) {
      setTypeModal('Error');
      setTextModal(error);
      openModal();
    }
  };

  useEffect(() => {
    openModalOnError(error);
  }, [error]);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(schema)
  });

  const onSubmit = (data) => {
    dispatch(login(data));
    console.log(error);
    setTypeModal('Success');
    setTextModal('Login successful');
    openModal();
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className={styles.container}>
        <h2>Login</h2>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <InputField
            name="email"
            type="text"
            placeholder="Email"
            register={register}
            error={errors.email?.message}
          />
          <InputField
            name="password"
            type="password"
            placeholder="Password"
            register={register}
            error={errors.password?.message}
          />
          <div className={styles.buttons}>
            <Button href="/home" style="squaredPrimary" disabled={false} text="Back" />
            <Button
              onClick={handleSubmit(onSubmit)}
              style="squaredPrimary"
              disabled={false}
              text="Submit"
            />
            <MessageModal
              type={typeModal}
              isOpen={showModal}
              message={textModal}
              handleClose={closeModal}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
