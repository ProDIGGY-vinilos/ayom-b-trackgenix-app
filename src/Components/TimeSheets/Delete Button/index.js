import React from 'react';

function Button({ onDelete, timeSheetId }) {
  return <button onClick={() => onDelete(timeSheetId)}>+</button>;
}

export default Button;
