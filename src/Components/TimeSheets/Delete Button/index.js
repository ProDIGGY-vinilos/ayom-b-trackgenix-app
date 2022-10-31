import React from 'react';

function Button({ onDelete, timeSheetId }) {
  return <button onClick={() => onDelete(timeSheetId)}>Delete</button>;
}

export default Button;
