import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import MessageModal from 'Components/Shared/Modal/MessageModal';
import styles from 'Components/Tasks/tasks.module.css';
import Button from 'Components/Shared/Button/Button';
import InputField from 'Components/Shared/Input/input';
import { getOneTask, postTask, putTask } from 'redux/tasks/thunks';
import { joiResolver } from '@hookform/resolvers/joi';
import schema from 'Components/Tasks/Form/validations';

const Form = () => {
  const taskId = useParams().id;
  const dispatch = useDispatch();
  const dataTask = useSelector((state) => state.tasks.list.find((task) => task._id === taskId));

  const { error } = useSelector((state) => state.tasks);
  const [typeModal, setTypeModal] = useState('');
  const [textMessageModal, setTextMessageModal] = useState('');
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [isFetched, setIsFetched] = useState(false);

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
        dispatch(getOneTask(taskId));
        setIsFetched(true);
      }
    }
  }, []);

  useEffect(() => {
    if (taskId) {
      if (dataTask !== undefined) {
        reset({ description: dataTask.description });
      } else if (isFetched) {
        reset({ description: dataTask.description });
      }
    }
  }, [dataTask]);

  useEffect(() => {
    openModalOnError(error);
  }, [error]);

  const onSubmit = (data) => {
    if (taskId) {
      dispatch(putTask(taskId, data));
      setTypeModal('Success');
      setTextMessageModal('The Task was updated successfully');
      openMessageModal();
    } else {
      dispatch(postTask(data));
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
        <Button href="/tasks" style="roundedSecondary" diabled={false} text="X" />
        <div>
          <InputField
            id={taskId}
            name="description"
            type="text"
            placeholder="description"
            label="Description"
            register={register}
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
            goBack={'/tasks'}
          />
        </div>
      </form>
    </div>
  );
};

export default Form;
