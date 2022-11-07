import React from 'react';
import { Link } from 'react-router-dom';

const PrimaryBtn = (props) => {
  return (
    <Link to={`${props.href}`}>
      <button onClick={props.onClick} className={props.style} disabled={props.disabled}>
        <i className={props.icon} />
        {props.text}
      </button>
    </Link>
  );
};

export default PrimaryBtn;
