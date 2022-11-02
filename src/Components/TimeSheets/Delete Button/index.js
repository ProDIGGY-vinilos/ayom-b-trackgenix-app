import React from 'react';

function Button({ onDelete, timeSheetId, timeSheets }) {
  return <button onClick={() => onDelete(timeSheetId, timeSheets)}>Delete</button>;
}

export default Button;
