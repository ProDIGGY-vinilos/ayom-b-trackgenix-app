import React from 'react';
import { useEffect, useState } from 'react';
import MessageModal from 'Components/Shared/Modal/MessageModal';
import styles from 'Components/Pages/Employee/MyProfile/my-profile-edit.module.css';
import Button from 'Components/Shared/Button/Button';
import InputField from 'Components/Shared/Input/input';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { getOneEmployee, putEmployee } from 'redux/employees/thunks';
import { joiResolver } from '@hookform/resolvers/joi';
import { schema } from 'Components/Employees/validation';

const EmployeeForm = () => {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.employees);
  const [requested, setRequested] = useState(false);
  const employeeId = '636c1e8ddabe537336ae082a';
  const employee = useSelector((state) =>
    state.employees.list.find((employee) => employee._id === employeeId)
  );

  const [typeModal, setTypeModal] = useState('');
  const [textModal, setTextModal] = useState('');
  const [showModal, setShowModal] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(schema)
  });

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if (error) {
      setTypeModal('Error');
      setTextModal(error);
      openModal();
      setRequested(false);
    } else if (employeeId && requested) {
      openModal();
      setRequested(false);
    }
  }, [error]);

  const employeeData = {
    name: employee?.name,
    lastName: employee?.lastName,
    email: employee?.email,
    phone: employee?.phone,
    password: employee?.password
  };

  useEffect(() => {
    if (!employee) {
      dispatch(getOneEmployee(employeeId));
    }
    reset(employeeData);
  }, [employee]);

  const onSubmit = (data) => {
    dispatch(putEmployee(employeeId, data));
    setTypeModal('Success');
    setTextModal('SuperAdmin updated successfully');
    openModal();
  };

  return (
    <>
      <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
        <table className={styles.table}>
          <tbody className={styles.tBody}>
            <tr className={styles.rowContainer}>
              <td className={styles.td}>Name</td>
              <td className={styles.td}>
                <InputField
                  name="name"
                  type="text"
                  placeholder="Name"
                  register={register}
                  error={errors.name?.message}
                />
              </td>
            </tr>
            <tr className={styles.rowContainer}>
              <td className={styles.td}>Last Name</td>
              <td className={styles.td}>
                <InputField
                  name="lastName"
                  type="text"
                  placeholder="Last Name"
                  register={register}
                  error={errors.lastName?.message}
                />
              </td>
            </tr>
            <tr className={styles.rowContainer}>
              <td className={styles.td}>Email</td>
              <td className={styles.td}>
                <InputField
                  name="email"
                  type="text"
                  placeholder="Email"
                  register={register}
                  error={errors.email?.message}
                />
              </td>
            </tr>
            <tr className={styles.rowContainer}>
              <td className={styles.td}>Phone Number</td>
              <td className={styles.td}>
                <InputField
                  name="phone"
                  type="text"
                  placeholder="Phone Number"
                  register={register}
                  error={errors.phone?.message}
                />
              </td>
            </tr>
            <tr className={styles.rowContainer}>
              <td className={styles.td}>Password</td>
              <td className={styles.td}>
                <InputField
                  name="password"
                  type="password"
                  placeholder="Password"
                  register={register}
                  error={errors.password?.message}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <div className={styles.buttons}>
          <Button href="profile" style="squaredPrimary" disabled={false} text="Back" />
          <MessageModal
            type={typeModal}
            isOpen={showModal}
            message={textModal}
            handleClose={closeModal}
            goBack={'/employee-form'}
          />
          <Button
            onClick={handleSubmit(onSubmit)}
            style="squaredPrimary"
            disabled={false}
            text="Save"
          />
        </div>
      </form>
    </>
  );
};

export default EmployeeForm;
