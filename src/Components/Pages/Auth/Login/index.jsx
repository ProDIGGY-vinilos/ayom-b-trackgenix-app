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
import { Link } from 'react-router-dom';
import LoadingModal from 'Components/Shared/Loading';

const Login = (props) => {
  const dispatch = useDispatch();
  const { isLoading, error, role } = useSelector((state) => state.auth);
  const [typeModal, setTypeModal] = useState('');
  const [textModal, setTextModal] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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

  const viewPassword = () => {
    if (!showPassword) {
      setShowPassword(true);
    } else {
      setShowPassword(false);
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
    setTypeModal('Success');
    setTextModal('Login successful');
    openModal();
  };

  if (isLoading) {
    return (
      <section className={styles.loaderContainer}>
        <div className={styles.spinnerContainer}>
          <LoadingModal />;
        </div>
      </section>
    );
  }

  return (
    <>
      <h2 className={styles.title}>Trackgenix</h2>
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css"
      ></link>
      <div className={styles.container}>
        <div className={styles.loginImage}></div>
        <div className={styles.loginContainer}>
          <h3 className={styles.login}>Login</h3>
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.flexForm}>
              <InputField
                label=""
                name="email"
                type="text"
                placeholder="Email"
                register={register}
                error={errors.email?.message}
              />
            </div>
            <div className={styles.flexForm}>
              <div className={styles.passwordBox}>
                <InputField
                  label=""
                  name="password"
                  type={!showPassword ? 'password' : 'text'}
                  placeholder="Password"
                  register={register}
                  error={errors.password?.message}
                />
                <div className={styles.passwordIcon} onClick={() => viewPassword()}>
                  <i className={showPassword ? 'fa fa-eye-slash' : 'fa fa-eye'}></i>
                </div>
              </div>
            </div>
            <div className={styles.buttons}>
              <Button
                onClick={handleSubmit(onSubmit)}
                style="squaredPrimary"
                disabled={false}
                text="Login"
              />
              <p>
                New to Trackgenix?{' '}
                <Link className={styles.link} to="/sign-up">
                  Sign up now
                </Link>
              </p>
              <MessageModal
                type={typeModal}
                isOpen={showModal}
                message={textModal}
                handleClose={closeModal}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
