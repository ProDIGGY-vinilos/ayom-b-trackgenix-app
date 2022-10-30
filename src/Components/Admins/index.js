import { useEffect, useState } from 'react';
import List from './adminList';

function Admins() {
  const [admins, saveAdmins] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/admins`)
      .then((response) => response.json())
      .then((response) => {
        saveAdmins(response.data);
      });
  }, []);

  const deleteAdmin = (id) => {
    saveAdmins([...admins.filter((newListItem) => newListItem._id !== id)]);
  };

  return (
    <div>
      <List list={admins} saveAdmins={saveAdmins} deleteItem={deleteAdmin} />
    </div>
  );
}

export default Admins;
