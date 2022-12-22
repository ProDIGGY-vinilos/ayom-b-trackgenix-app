import { useState, useEffect } from 'react';
import styles from 'Components/Pages/Employee/TimeSheetsList/Form/form.module.css';
import Select from 'Components/Shared/Select';
import InputField from 'Components/Shared/Input/input';
import DatePicker from 'Components/Shared/Datepicker';
import MessageModal from 'Components/Shared/Modal/MessageModal';
import Button from 'Components/Shared/Button/Button';
import { useSelector, useDispatch } from 'react-redux';
import { postTimeSheet } from 'redux/timeSheets/thunks';
import { getProjectsByEmployee } from 'redux/projects/thunks';
import { getTasks } from 'redux/tasks/thunks';
import { useForm } from 'react-hook-form';
import { timeSheetValidation } from './validations';
import { joiResolver } from '@hookform/resolvers/joi';
import TextAreaField from 'Components/Shared/TextArea';
import { useParams } from 'react-router-dom';
import { clearError } from 'redux/timeSheets/actions';

const TimeSheetsForm = () => {
  const [typeModal, setTypeModal] = useState();
  const [textModal, setTextModal] = useState();
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const { error, message } = useSelector((state) => state.timeSheets);
  const { list: projectsList } = useSelector((state) => state.projects);
  const { list: taskList } = useSelector((state) => state.tasks);
  const employeeId = useParams().id;
  const token = sessionStorage.getItem('token');

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(timeSheetValidation)
  });

  const openModal = () => {
    setShowModal(true);
    dispatch(clearError());
  };

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if (error) {
      setTypeModal('Error');
      setTextModal(error);
      openModal();
    } else if (message) {
      setTypeModal('Success');
      setTextModal(message);
      openModal();
    }
  }, [error, message]);

  useEffect(() => {
    dispatch(getTasks(token));
    dispatch(getProjectsByEmployee(employeeId, token));
  }, []);

  const createTimeSheet = (data) => {
    data = {
      ...data,
      employee: employeeId
    };
    dispatch(postTimeSheet(data, token));
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(createTimeSheet)} className={styles.form}>
        <div className={styles.formContainer}>
          <div>
            <DatePicker
              label="Date"
              inputName="date"
              register={register}
              error={errors.date?.message}
            />
          </div>
          <div>
            <InputField
              name="hours"
              label="Hours"
              type="text"
              register={register}
              error={errors.hours?.message}
              slimInput={true}
            />
          </div>
          <div>
            <Select
              options={projectsList || undefined}
              field="name"
              name="project"
              label="Select Project"
              register={register}
              error={errors.project?.message}
            />
          </div>
          <div>
            <Select
              register={register}
              options={taskList || undefined}
              field="description"
              label="Select Task"
              name="task"
              error={errors.task?.message}
            />
          </div>
        </div>
        <div className={styles.textAreaContainer}>
          <TextAreaField
            label="Description"
            name="description"
            placeholder="Description"
            register={register}
            columns={40}
            error={errors.description?.message}
          />
        </div>
      </form>
      <div className={styles.buttons}>
        <Button href="/employee/timesheets" style="squaredSecondary" disabled={false} text="Back" />
        <Button
          onClick={handleSubmit(createTimeSheet)}
          style="squaredPrimary"
          disabled={false}
          text="Save"
        />
      </div>
      <MessageModal
        type={typeModal}
        isOpen={showModal}
        message={textModal}
        handleClose={closeModal}
        goBack={'/employee/timesheets'}
      />
    </div>
  );
};

export default TimeSheetsForm;
