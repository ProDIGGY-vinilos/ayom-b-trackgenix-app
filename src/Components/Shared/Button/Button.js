import React from 'react';
import { useHistory } from 'react-router-dom';
import styles from 'Components/Shared/Button/button.module.css';
import { FaEdit, FaTrash } from 'react-icons/fa';

const Button = ({ style, href, text, icon, onClick, disabled }) => {
  const history = useHistory();

  const onAction = () => {
    if (href !== undefined) {
      history.push(`${href}`);
    } else {
      onClick();
    }
  };

  let iconType;
  if (icon != undefined) {
    if (icon === 'edit') {
      iconType = <FaEdit />;
    } else {
      iconType = <FaTrash />;
    }
  } else {
    iconType = null;
  }

  return (
    <button type="button" onClick={onAction} className={styles[style]} disabled={disabled}>
      {iconType}
      {text}
    </button>
  );
};

export default Button;
