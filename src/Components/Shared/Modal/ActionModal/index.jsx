import React from 'react';
import styles from 'Components/Shared/Modal/ActionModal/modal.module.css';
import Button from 'Components/Shared/Button/Button';

const Modal = ({
  showModal,
  closeModal,
  title,
  message,
  confirmAction,
  id,
  declineButtonText = 'Cancel',
  confirmButtonText = 'Confirm'
}) => {
  if (!showModal) {
    return null;
  }

  const declineButtonAction = () => {
    closeModal();
  };

  const confirmButtonAction = () => {
    confirmAction(id);
    closeModal();
  };

  return (
    <div className={styles.moduleContainer}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h3>{title}</h3>
        </div>
        <div className={styles.modalBody}>
          <p className={styles.modalText}>{message}</p>
        </div>
        <div className={styles.modalButtons}>
          <Button
            onClick={declineButtonAction}
            style="squaredSecondary"
            disabled={false}
            text={declineButtonText}
          />
          <Button
            onClick={confirmButtonAction}
            style="squaredPrimary"
            disabled={false}
            text={confirmButtonText}
          />
        </div>
      </div>
    </div>
  );
};

export default Modal;
