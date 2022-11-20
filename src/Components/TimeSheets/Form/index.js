import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './form.module.css';
import Select from '../../Shared/Select';
import InputField from '../../Shared/Input/input';
import DatePicker from '../../Shared/Datepicker';
import MessageModal from '../../Shared/Modal/MessageModal';
import Button from '../../Shared/Button/Button';
import { useSelector, useDispatch } from 'react-redux';
import { getOneTimeSheet, postTimeSheet, putTimeSheet } from '../../../redux/timeSheets/thunks';
import { getEmployees } from '../../../redux/employees/thunks';
import { getProjects } from '../../../redux/projects/thunks';
import { getTasks } from '../../../redux/tasks/thunks';
import { useForm } from 'react-hook-form';
import { timeSheetValidation } from './validations';
import { joiResolver } from '@hookform/resolvers/joi';

const TimeSheetsForm = () => {
  const pathed = useParams().id;
  /* const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [hours, setHours] = useState('');
  const [projectId, setProjectId] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [taskId, setTaskId] = useState(''); */
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

  console.log(timeSheetData);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(timeSheetValidation)
  });

  const MOCK_DATA = {
    date: timeSheetData?.date,
    hours: timeSheetData?.hours,
    project: timeSheetData?.project,
    employee: timeSheetData?.employee,
    task: timeSheetData?.task,
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

  /* const setStates = (timeSheetData) => {
    setDescription(timeSheetData.description);
    setDate(timeSheetData.date);
    setHours(timeSheetData.hours);
    setProjectId(timeSheetData.project._id);
    setEmployeeId(timeSheetData.employee._id);
    setTaskId(timeSheetData.task._id);
  }; */

  useEffect(() => {
    openModalOnError(error);
  }, [error]);

  useEffect(() => {
    if (timeSheetData !== undefined) {
      /* setStates(timeSheetData); */
      reset(MOCK_DATA);
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
        /* setStates(timeSheetData); */
        reset(MOCK_DATA);
      } else {
        dispatch(getOneTimeSheet(timeSheetId));
      }
    }
  }, [projectsList, employeeList, taskList]);

  const createTimeSheet = (Description, Date, Hours, ProjectId, TaskId, EmployeeId) => {
    const req = {
      description: Description,
      date: Date,
      project: ProjectId,
      task: TaskId,
      employee: EmployeeId,
      hours: Hours
    };
    if (formSwitch) {
      dispatch(putTimeSheet(req, pathed));
      setTypeModal('Success');
      setTextModal('TimeSheet edited successfully');
      openModal();
    } else {
      dispatch(postTimeSheet(req));
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
      <Button href="/time-sheets" style="roundedSecondary" disabled={false} text="X" />
      <form onSubmit={handleSubmit(createTimeSheet)} className={styles.form}>
        <div className={styles.formcontainer}>
          <div>
            <DatePicker
              label="Date"
              name="date"
              /* inputValue={date.substring(0, 10)}
              changeValue={setDate} */
              register={register}
              error={errors.date?.message}
            />
          </div>
          <div>
            <InputField
              label="Hours"
              name="hours"
              type="text"
              register={register}
              error={errors.hours?.message}
              /* defaultValue={hours || undefined}
              value={hours || undefined}
              onChange={(e) => setHours(e.target.value)} */
            />
          </div>
          <div>
            <Select
              label="Select Project"
              name="project"
              register={register}
              error={errors.project?.message}
              /* selectedValue={projectId || undefined} */
              options={projectsList || undefined}
              /* changeValue={setProjectId} */
              field="project"
            />
          </div>
          <div>
            <Select
              register={register}
              /* selectedValue={employeeId || undefined} */
              options={employeeList || undefined}
              /* changeValue={setEmployeeId} */
              field="employee"
              label="Select Employee"
              name="employee"
              error={errors.employee?.message}
            />
          </div>
          <div>
            <Select
              register={register}
              /* selectedValue={taskId || undefined} */
              options={taskList || undefined}
              /* changeValue={setTaskId} */
              field="description"
              label="Select Task"
              name="task"
              error={errors.task?.message}
            />
          </div>
        </div>
        <div className={styles.textareacontainer}>
          <label>Description</label>
          <textarea
            /* value={description || undefined} */
            /* onChange={(e) => setDescription(e.target.value)} */
            placeholder="Description"
          ></textarea>
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
        goBack={'/time-sheets'}
      />
    </div>
  );
};

export default TimeSheetsForm;
