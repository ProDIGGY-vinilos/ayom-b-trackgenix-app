import { useState } from 'react';

function Form() {
  const [nameValue, setNameValue] = useState({
    name: '',
    lastName: '',
    email: '',
    password: ''
  });

  const onChange = (e) => {
    setNameValue({ ...nameValue, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(nameValue);
    const paramas = new URLSearchParams(window.location.search);
    const clientID = paramas.get('id');
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(nameValue)
    };

    const url = `${process.env.REACT_APP_API_URL}/admins/${clientID}`;
    fetch(url, options).then((response) => {
      if (response.status !== 200 && response.status !== 201) {
        return response.json().then(({ message }) => {
          throw new Error(message);
        });
      }
      console.log(response);
      return response.json();
    });
  };
  return (
    <form onSubmit={onSubmit}>
      <div>
        <label>Name</label>
        <input type="text" name="name" value={nameValue.name} onChange={onChange} />
      </div>
      <div>
        <label>LastName</label>
        <input type="text" name="lastName" value={nameValue.lastName} onChange={onChange} />
      </div>
      <div>
        <label>Email</label>
        <input type="text" name="email" value={nameValue.email} onChange={onChange} />
      </div>
      <div>
        <label>Pasasword</label>
        <input type="text" name="password" value={nameValue.password} onChange={onChange} />
      </div>
      <div>
        <button type="submit">Save</button>
      </div>
    </form>
  );
}

export default Form;
