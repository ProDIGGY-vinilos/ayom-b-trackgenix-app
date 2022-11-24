import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from 'Components/TimeSheets/Form/form.module.css';
import Select from 'Components/Shared/Select';
import InputField from 'Components/Shared/Input/input';
import DatePicker from 'Components/Shared/Datepicker';
import MessageModal from 'Components/Shared/Modal/MessageModal';
import Button from 'Components/Shared/Button/Button';
import TextAreaField from 'Components/Shared/TextArea';
import { useSelector, useDispatch } from 'react-redux';
import { getOneTimeSheet, postTimeSheet, putTimeSheet } from 'redux/timeSheets/thunks';
import { getEmployees } from 'redux/employees/thunks';
import { getProjects } from 'redux/projects/thunks';
import { getTasks } from 'redux/tasks/thunks';
import { useForm } from 'react-hook-form';
import { timeSheetValidation } from './validations';
import { joiResolver } from '@hookform/resolvers/joi';

const TimeSheetsForm = () => {
  const pathed = useParams().id;
  const [timeSheetId, setTimeSheetId] = useState('');
  const [typeModal, setTypeModal] = useState();
  const [textModal, setTextModal] = useState();
  const [showModal, setShowModal] = useState(false);
  const [formSwitch, setFormSwitch] = useState(false);
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.timeSheets);
  const { list: projectsList } = useSelector((state) => state.projects);
  const { list: taskList } = useSelector((state) => state.tasks);
  const { list: employeeList } = useSelector((state) => state.employees);
  const timeSheetData = useSelector((state) =>
    state.timeSheets.list.find((timeSheets) => timeSheets._id === timeSheetId)
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(timeSheetValidation)
  });

  const data = {
    date: timeSheetData?.date.substring(0, 10),
    hours: timeSheetData?.hours,
    project: timeSheetData?.project._id,
    employee: timeSheetData?.employee._id,
    task: timeSheetData?.task._id,
    description: timeSheetData?.description
  };

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
    if (timeSheetData !== undefined) {
      reset(data);
    }
  }, [timeSheetData]);

  useEffect(() => {
    if (pathed) {
      setTimeSheetId(pathed);
      setFormSwitch(true);
    }
    dispatch(getProjects());
    dispatch(getTasks());
    dispatch(getEmployees());
  }, []);

  useEffect(() => {
    if (timeSheetId && projectsList.length && employeeList.length && taskList.length) {
      if (timeSheetData !== undefined) {
        reset(data);
      } else {
        dispatch(getOneTimeSheet(timeSheetId));
      }
    }
  }, [projectsList, employeeList, taskList]);

  const createTimeSheet = (data) => {
    if (formSwitch) {
      dispatch(putTimeSheet(data, pathed));
      setTypeModal('Success');
      setTextModal('TimeSheet edited successfully');
      openModal();
    } else {
      dispatch(postTimeSheet(data));
      setTypeModal('Success');
      setTextModal('TimeSheet added successfully');
      openModal();
    }
  };

  return (
    <div className={styles.container}>
      {formSwitch ? (
        <h2 className={styles.title}>Edit time sheet</h2>
      ) : (
        <h2 className={styles.title}>Add new time sheet</h2>
      )}
      <Button href="/admin/timesheets" style="roundedSecondary" disabled={false} text="X" />
      <form onSubmit={handleSubmit(createTimeSheet)} className={styles.form}>
        <div className={styles.formcontainer}>
          <div>
            <DatePicker
              label="date"
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
              options={employeeList || undefined}
              field="name"
              name="employee"
              label="Select Employee"
              register={register}
              error={errors.employee?.message}
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
        <div className={styles.textareacontainer}>
          <label>Description</label>
          <TextAreaField
            name="description"
            placeholder="Description"
            register={register}
            columns={30}
          />
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
        goBack={'/admin/timesheets'}
      />
    </div>
  );
};

export default TimeSheetsForm;
