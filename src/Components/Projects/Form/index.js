import React, { useEffect, useState } from 'react';

const index = () => {
  const [idState, setIdState] = useState('');

  useEffect(() => {
    const path = window.location.pathname.split('/');
    setIdState(path[path.length - 1]);
  }, []);

  return (
    <div>
      <h2>Hola</h2>
      <p>{idState}</p>
    </div>
  );
};

export default index;
