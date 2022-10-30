import React, { useEffect, useState } from 'react';

const index = ({ text }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [clientName, setClientName] = useState('');
  const [employee, setemployee] = useState('');
  const [role, setRole] = useState('');
  const [rate, setRate] = useState('');
  const [idState, setIdState] = useState('');

  const [projectBody, setProjectBody] = useState({});

  useEffect(async () => {
    const path = window.location.pathname.split('/');
    let projectId = path[path.length - 1];
    setIdState(projectId);
    console.log(projectId);
    if (projectId !== 'project-form') {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}api/projects/${projectId}`);
        const data = await response.json();
        setProjectBody(data.data);
      } catch (error) {
        console.error(error);
      }
    }
  }, [idState]);

  console.log(projectBody);

  console.log(projectBody.employees);

  const onChangeNameValue = (e) => {
    setName(e.target.value);
  };

  const onChangeDescriptionValue = (e) => {
    setDescription(e.target.value);
  };

  const onChangeStartDateValue = (e) => {
    setStartDate(e.target.value);
  };

  const onChangeEndDateValue = (e) => {
    setEndDate(e.target.value);
  };

  const onChangeClientNameValue = (e) => {
    setClientName(e.target.value);
  };

  const onChangeEmployeeValue = (e) => {
    setemployee(e.target.value);
  };

  const onChangeRoleValue = (e) => {
    setRole(e.target.value);
  };

  const onChangeRateValue = (e) => {
    setRate(e.target.value);
  };

  let bodyToSend = {
    name: name.toString(),
    description: description.toString(),
    startDate: startDate.toString(),
    endDate: endDate.toString(),
    clientName: clientName.toString(),
    employees: [
      {
        employee: employee.toString(),
        role: role.toString(),
        rate: rate
      }
    ]
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(JSON.stringify(bodyToSend));

    if (idState.length === 24) {
      const updateProject = await fetch(`${process.env.REACT_APP_API_URL}api/projects/${idState}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(bodyToSend)
      });

      console.log(updateProject);
    } else {
      const updateProject = await fetch(`${process.env.REACT_APP_API_URL}api/projects/`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(bodyToSend)
      });

      console.log(updateProject);
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit} action="">
        {projectBody ? (
          <>
            <div>
              <label>Name</label>
              <input
                type="text"
                name="name"
                defaultValue={projectBody.name}
                onChange={onChangeNameValue}
                required
              />
            </div>
            <div>
              <label>Description</label>
              <input
                type="text"
                name="description"
                defaultValue={projectBody.description}
                onChange={onChangeNameValue}
                required
              />
            </div>
            <div>
              <label>Start Date</label>
              <input
                type="text"
                name="start date"
                defaultValue={projectBody.startDate}
                onChange={onChangeNameValue}
                required
              />
            </div>
            <div>
              <label>End Date</label>
              <input
                type="text"
                name="end date"
                defaultValue={projectBody.endDate}
                onChange={onChangeNameValue}
                required
              />
            </div>
            <div>
              <label>Client Name</label>
              <input
                type="text"
                name="client name"
                defaultValue={projectBody.clientName}
                onChange={onChangeNameValue}
                required
              />
            </div>
            {/* {projectBody.employees.map((employee) => {
              <div>
                <label>Employee</label>
                <input
                  type="text"
                  name="employee"
                  defaultValue={employee.name}
                  onChange={onChangeNameValue}
                  required
                />
                <label>Role</label>
                <input
                  type="text"
                  name="role"
                  defaultValue={employee.role}
                  onChange={onChangeNameValue}
                  required
                />
                <label>Rate</label>
                <input
                  type="number"
                  name="rate"
                  defaultValue={employee.rate}
                  onChange={onChangeNameValue}
                  required
                />
              </div>;
            })} */}
          </>
        ) : (
          <>
            <div>
              <label htmlFor="">Name</label>
              <input type="text" on onChange={onChangeNameValue} required />
            </div>
            <div>
              <label htmlFor="">Description</label>
              <input type="text" onChange={onChangeDescriptionValue} />
            </div>
            <div>
              <label htmlFor="">Start Date</label>
              <input type="text" onChange={onChangeStartDateValue} />
            </div>
            <div>
              <label htmlFor="">End Date</label>
              <input type="text" onChange={onChangeEndDateValue} />
            </div>
            <div>
              <label htmlFor="">Client Name</label>
              <input type="text" onChange={onChangeClientNameValue} />
            </div>
            <div>
              <label htmlFor="">Employee</label>
              <input type="text" onChange={onChangeEmployeeValue} />
              <label htmlFor="">Role</label>
              <input type="text" onChange={onChangeRoleValue} />
              <label htmlFor="">Rate</label>
              <input type="number" onChange={onChangeRateValue} />
            </div>
          </>
        )}
        <button type="submit" onClick={onSubmit}>
          {text}
        </button>
      </form>
    </div>
  );
};

export default index;
