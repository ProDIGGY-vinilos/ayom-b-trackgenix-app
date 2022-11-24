import { useState, useEffect } from 'react';
import styles from 'Components/Pages/Employee/TimeSheetsList/Form/form.module.css';
import Select from 'Components/Shared/Select';
import InputField from 'Components/Shared/Input/input';
import DatePicker from 'Components/Shared/Datepicker';
import MessageModal from 'Components/Shared/Modal/MessageModal';
import Button from 'Components/Shared/Button/Button';
import { useSelector, useDispatch } from 'react-redux';
import { postTimeSheet } from 'redux/timeSheets/thunks';
import { getEmployees } from 'redux/employees/thunks';
import { getProjectsByEmployee } from 'redux/projects/thunks';
import { getTasks } from 'redux/tasks/thunks';
import { useForm } from 'react-hook-form';
import { timeSheetValidation } from './validations';
import { joiResolver } from '@hookform/resolvers/joi';

const TimeSheetsForm = () => {
  const [typeModal, setTypeModal] = useState();
  const [textModal, setTextModal] = useState();
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.timeSheets);
  const { list: projectsList } = useSelector((state) => state.projects);
  const { list: taskList } = useSelector((state) => state.tasks);
  const employeeId = '636c1e8ddabe537336ae082a';

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(timeSheetValidation)
  });

  const openModalOnError = (error) => {
    if (error) {
      setTypeModal('Error');
      setTextModal(error);
      openModal();
    }
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    openModalOnError(error);
  }, [error]);

  useEffect(() => {
    dispatch(getTasks());
    dispatch(getEmployees());
    dispatch(getProjectsByEmployee(employeeId));
  }, []);

  const createTimeSheet = (data) => {
    data = {
      ...data,
      employee: employeeId
    };
    dispatch(postTimeSheet(data));
    setTypeModal('Success');
    setTextModal('TimeSheet added successfully');
    openModal();
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Add new time sheet</h2>
      <Button href="/employee/timesheets" style="roundedSecondary" disabled={false} text="X" />
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
          <label>Description</label>
          <textarea
            className={styles.textArea}
            name="description"
            {...register('description')}
            placeholder="Description"
          ></textarea>
          {errors.description && <p>{errors.description.message}</p>}
        </div>
      </form>
      <Button
        onClick={handleSubmit(createTimeSheet)}
        style="squaredPrimary"
        disabled={false}
        text="Save"
      />
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
