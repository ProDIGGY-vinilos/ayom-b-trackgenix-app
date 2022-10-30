const Employee = ({ employee }) => {
  return (
    <div className="employee">
      <h4>{employee.name}</h4>
      <h4>{employee.lastName}</h4>
      <h4>{employee.email}</h4>
      <h4>{employee.phone}</h4>
    </div>
  );
};

export default Employee;
