import { useEffect, useState } from 'react';
import List from './adminList';
import AddItem from './addAdmin';

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

  const addItem = ({ name, lastName, email, password }) => {
    const newItem = {
      id: Math.floor(Math.random() * 1000),
      name,
      lastName,
      email,
      password
    };
    saveAdmins([...admins, newItem]);
  };

  return (
    <div>
      <AddItem addAdmin={addItem} />
      <List list={admins} saveAdmins={saveAdmins} deleteItem={deleteAdmin} />
    </div>
  );
}

export default Admins;
