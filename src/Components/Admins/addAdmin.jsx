import { useState } from 'react';

const AddItem = ({ addAdmin }) => {
  const [userInput, setUserInput] = useState({
    name: '',
    lastName: '',
    email: '',
    password: ''
  });

  const onChange = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(userInput);
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userInput)
    };

    const url = `${process.env.REACT_APP_API_URL}/admins`;
    fetch(url, options).then((response) => {
      if (response.status !== 200 && response.status !== 201) {
        return response.json().then(({ message }) => {
          throw new Error(message);
        });
      }
      console.log(response);
      return response.json();
    });

    addAdmin(userInput);
    setUserInput({
      name: '',
      lastName: '',
      email: '',
      password: ''
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label>Name</label>
        <input type="text" name="name" value={userInput.name} onChange={onChange} required />
      </div>
      <div>
        <label>LastName</label>
        <input type="text" name="lastName" value={userInput.lastName} onChange={onChange} />
      </div>
      <div>
        <label>Email</label>
        <input type="text" name="email" value={userInput.email} onChange={onChange} />
      </div>
      <div>
        <label>Pasasword</label>
        <input type="text" name="password" value={userInput.password} onChange={onChange} />
      </div>
      <div>
        <button type="submit">Save</button>
      </div>
    </form>
  );
};

export default AddItem;
