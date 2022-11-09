import React from 'react';
import { useHistory } from 'react-router-dom';
import styles from './button.module.css';

const Button = (props) => {
  const history = useHistory();

  const onAction = () => {
    if (props.href !== undefined) {
      history.push(`${props.href}`);
    } else {
      props.onClick();
    }
  };

  return (
    <button onClick={onAction} className={styles[props.style]} disabled={props.disabled}>
      <i className={props.icon} />
      {props.text}
    </button>
  );
};

export default Button;
