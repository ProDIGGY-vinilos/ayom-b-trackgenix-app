import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import MessageModal from 'Components/Shared/Modal/MessageModal';
import styles from 'Components/Tasks/tasks.module.css';
import Button from 'Components/Shared/Button/Button';
import TextAreaField from 'Components/Shared/TextArea/index';
import { getOneTask, postTask, putTask } from 'redux/tasks/thunks';
import { joiResolver } from '@hookform/resolvers/joi';
import schema from 'Components/Tasks/Form/validations';

const TaskForm = () => {
  const taskId = useParams().id;
  const dispatch = useDispatch();
  const dataTask = useSelector((state) => state.tasks.list.find((task) => task._id === taskId));
  const token = sessionStorage.getItem('token');

  const { error } = useSelector((state) => state.tasks);
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
    openModalOnError(error);
  }, [error]);

  const onSubmit = (data) => {
    if (taskId) {
      dispatch(putTask(taskId, data, token));
      setTypeModal('Success');
      setTextMessageModal('The Task was updated successfully');
      openMessageModal();
    } else {
      dispatch(postTask(data, token));
      setTypeModal('Success');
      setTextMessageModal('The Task was created successfully');
      openMessageModal();
    }
  };

  const openModalOnError = (error) => {
    if (error) {
      setTypeModal('Error');
      setTextMessageModal(error);
      openMessageModal();
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.addItem} onSubmit={handleSubmit(onSubmit)}>
        <Button href="/admin/tasks" style="roundedSecondary" diabled={false} text="X" />
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
