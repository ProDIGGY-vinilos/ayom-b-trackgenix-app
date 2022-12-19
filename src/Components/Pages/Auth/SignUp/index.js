import React from 'react';
import { useEffect, useState } from 'react';
import MessageModal from 'Components/Shared/Modal/MessageModal';
import styles from 'Components/Pages/Auth/SignUp/signup.module.css';
import Button from 'Components/Shared/Button/Button';
import InputField from 'Components/Shared/Input/input';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { postEmployee } from 'redux/employees/thunks';
import { clearError } from 'redux/employees/actions';
import { joiResolver } from '@hookform/resolvers/joi';
import { schema } from 'Components/Pages/Auth/SignUp/validation';
import { Link } from 'react-router-dom';

const EmployeeForm = () => {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.employees);
  const [requested, setRequested] = useState(false);

  const [typeModal, setTypeModal] = useState('');
  const [textModal, setTextModal] = useState('');
  const [showModal, setShowModal] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(schema)
  });

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    dispatch(clearError());
  };

  useEffect(() => {
    if (error) {
      setTypeModal('Error');
      setTextModal(error);
      openModal();
      setRequested(false);
    } else if (requested) {
      setTextModal('Employee created successfully');
      openModal();
      setRequested(false);
    }
  }, [error]);

  useEffect(() => {
    dispatch(clearError());
  }, []);

  const onSubmit = (data) => {
    dispatch(postEmployee('', data));
    setRequested(true);
    setTypeModal('Success');
  };

  return (
    <>
      <h1 className={styles.title}>Trackgenix</h1>
      <div className={styles.signUpDesign}>
        <div className={styles.imgForm}></div>
        <div className={styles.divForm}>
          <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
            <h3 className={styles.titleForm}>Sign up</h3>
            <div className={styles.formNameLast}>
              <div className={styles.formControl}>
                <InputField
                  name="name"
                  type="text"
                  placeholder="First name"
                  register={register}
                  error={errors.name?.message}
                />
              </div>
              <div className={styles.formControl}>
                <InputField
                  name="lastName"
                  type="text"
                  placeholder="Last name"
                  register={register}
                  error={errors.lastName?.message}
                />
              </div>
            </div>
            <div className={styles.formControl}>
              <InputField
                name="email"
                type="mail"
                placeholder="Email"
                register={register}
                error={errors.email?.message}
              />
            </div>
            <div className={styles.formControl}>
              <InputField
                name="phone"
                type="number"
                placeholder="Phone"
                register={register}
                error={errors.phone?.message}
              />
            </div>
            <div className={styles.formControl}>
              <InputField
                name="password"
                type="password"
                placeholder="Password"
                register={register}
                error={errors.password?.message}
              />
            </div>
            <div>
              <MessageModal
                type={typeModal}
                isOpen={showModal}
                message={textModal}
                handleClose={closeModal}
                goBack={'/login'}
              />
            </div>
            <div className={styles.divBtn}>
              <Button href="/home" style="squaredSecondary2" disabled={false} text="Back" />
              <Button
                onClick={handleSubmit(onSubmit)}
                style="squaredPrimary2"
                disabled={false}
                text="Sign up"
              />
            </div>
            <p className={styles.haveAccount}>
              Already have an account?{' '}
              <Link className={styles.link} to="/login">
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default EmployeeForm;
