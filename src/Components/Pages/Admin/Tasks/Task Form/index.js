import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import MessageModal from 'Components/Shared/Modal/MessageModal';
import styles from 'Components/Pages/Admin/Tasks/tasks.module.css';
import Button from 'Components/Shared/Button/Button';
import TextAreaField from 'Components/Shared/TextArea/index';
import { getOneTask, postTask, putTask } from 'redux/tasks/thunks';
import { joiResolver } from '@hookform/resolvers/joi';
import schema from 'Components/Pages/Admin/Tasks/Task Form/validations';
import { clearError } from 'redux/tasks/actions';

const TaskForm = () => {
  const taskId = useParams().id;
  const dispatch = useDispatch();
  const dataTask = useSelector((state) => state.tasks.list.find((task) => task._id === taskId));
  const token = sessionStorage.getItem('token');

  const { error, message } = useSelector((state) => state.tasks);
  const [typeModal, setTypeModal] = useState('');
  const [textMessageModal, setTextMessageModal] = useState('');
  const [showMessageModal, setShowMessageModal] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(schema)
  });

  const openMessageModal = () => {
    setShowMessageModal(true);
    dispatch(clearError());
  };

  const closeMessageModal = () => {
    setShowMessageModal(false);
  };

  useEffect(() => {
    if (taskId) {
      if (dataTask === undefined) {
        dispatch(getOneTask(taskId, token));
      }
    }
  }, []);

  useEffect(() => {
    if (taskId) {
      if (dataTask !== undefined) {
        reset({ description: dataTask.description });
      }
    }
  }, [dataTask]);

  useEffect(() => {
    if (error) {
      setTypeModal('Error');
      setTextMessageModal(error);
      openMessageModal();
    } else if (message) {
      setTypeModal('Success');
      setTextMessageModal(message);
      openMessageModal();
    }
  }, [error, message]);

  const onSubmit = (data) => {
    if (taskId) {
      dispatch(putTask(taskId, data, token));
    } else {
      dispatch(postTask(data, token));
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.addItem} onSubmit={handleSubmit(onSubmit)}>
        <div>
          <TextAreaField
            className={styles.textarea}
            name="description"
            placeholder="Description"
            register={register}
            columns="100"
            error={errors.description?.message}
          />
        </div>
        <div className={styles.buttonsDiv}>
          <Button href="/admin/tasks" style="squaredPrimary" diabled={false} text="Back" />
          <Button
            onClick={handleSubmit(onSubmit)}
            style="squaredPrimary"
            disabled={false}
            text="Save"
          />
          <MessageModal
            type={typeModal}
            isOpen={showMessageModal}
            message={textMessageModal}
            handleClose={closeMessageModal}
            goBack={'/admin/tasks'}
          />
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
