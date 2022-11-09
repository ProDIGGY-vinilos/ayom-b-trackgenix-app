import React from 'react';

const Button = ({ onDelete, timeSheetId, timeSheets }) => {
  return <button onClick={() => onDelete(timeSheetId, timeSheets)}>Delete</button>;
};

export default Button;
