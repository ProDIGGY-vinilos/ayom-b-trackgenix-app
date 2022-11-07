import React from 'react';
import { Link } from 'react-router-dom';

const SecondaryBtn = (props) => {
  return (
    <Link to={`${props.href}`}>
      <button onClick={props.onClick} className={props.style} disabled={props.disabled}>
        <i className={props.icon} />
        {props.text}
      </button>
    </Link>
  );
};

export default SecondaryBtn;
