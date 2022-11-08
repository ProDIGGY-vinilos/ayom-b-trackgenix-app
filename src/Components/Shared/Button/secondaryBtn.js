import React from 'react';
import { useHistory } from 'react-router-dom';

const SecondaryBtn = (props) => {
  let history = useHistory();
  const onAction = () => {
    if (props.href != undefined) {
      history.push(`${props.href}`);
    } else {
      props.onClick();
    }
  };
  return (
    <button onClick={onAction} className={props.style} disabled={props.disabled}>
      <i className={props.icon} />
      {props.text}
    </button>
  );
};

export default SecondaryBtn;
