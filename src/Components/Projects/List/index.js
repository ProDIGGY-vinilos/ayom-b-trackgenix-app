import React /* , { useState } */ from 'react';
import Employee from '../Employees';

const List = ({ projectItem, onDeleteItem /* , onOpenEdit,  showEdit , onCloseEdit */ }) => {
  /* const [showItem, setShowItem] = useState(false); */

  /* const closeItem = () => {
    console.log(showItem);
    setShowItem(false);
  }; */

  const urlId = `/project-form/${projectItem._id}`;

  const deleteItem = async () => {
    const updateProject = await fetch(
      `${process.env.REACT_APP_API_URL}api/projects/${projectItem._id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json'
        }
      }
    );
    updateProject.status === 200 && onDeleteItem(projectItem._id);

    console.log(updateProject);
  };

  return (
    <>
      <tr>
        <td>{projectItem.name}</td>
        <td>{projectItem.description}</td>
        <td>{projectItem.startDate}</td>
        <td>{projectItem.endDate}</td>
        <td>{projectItem.clientName}</td>
        {projectItem.employees.map((employee) => {
          return <Employee key={employee.index} employee={employee} />;
        })}
        <td>
          <button>
            <a href={urlId}>Edit Project</a>
          </button>
          <button
            onDoubleClick={async (e) => {
              e.preventDefault();
              deleteItem();
            }}
          >
            Delete Project
          </button>
        </td>
      </tr>
    </>
  );
};

export default List;
