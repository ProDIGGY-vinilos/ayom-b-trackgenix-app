import React from 'react';
import styles from 'Components/Shared/Modal/MessageModal/modal.module.css';
import Button from 'Components/Shared/Button/Button';

const MessageModal = ({ type, isOpen, message, handleClose, goBack }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.modalContainer}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h3 className={styles.modalTitle}>{type}</h3>
          <Button onClick={handleClose} style="roundedSecondary" disabled={false} text="X" />
        </div>
        <p className={styles.modalText}>{message}</p>
        {type !== 'Error' ? (
          <Button
            onClick={handleClose}
            href={goBack}
            style="squaredPrimary"
            disabled={false}
            text="Accept"
          />
        ) : (
          <Button onClick={handleClose} style="squaredPrimary" disabled={false} text="Accept" />
        )}
      </div>
    </div>
  );
};

export default MessageModal;
