import React from 'react';
import { useHistory } from 'react-router-dom';
import styles from 'Components/Shared/Button/button.module.css';

const Button = ({ style, href, text, icon, onClick, disabled }) => {
  const history = useHistory();

  const onAction = () => {
    if (href !== undefined) {
      history.push(`${href}`);
    } else {
      onClick();
    }
  };

  return (
    <button type="button" onClick={onAction} className={styles[style]} disabled={disabled}>
      <i className={icon} />
      {text}
    </button>
  );
};

export default Button;
