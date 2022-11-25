import { useEffect } from 'react';
import styles from 'Components/Employees/employees.module.css';
import Table from 'Components/Shared/Table';
import Button from 'Components/Shared/Button/Button';
import { useSelector, useDispatch } from 'react-redux';
import { getOneEmployee } from 'redux/employees/thunks';

const EmployeeProfile = () => {
  const dispatch = useDispatch();
  const { list: employeesList, isLoading } = useSelector((state) => state.employees);
  const employeeId = '636c1e8ddabe537336ae082a';

  useEffect(() => {
    dispatch(getOneEmployee(employeeId));
  }, []);

  const columns = [
    { heading: 'Name', value: 'name' },
    { heading: 'Last Name', value: 'lastName' },
    { heading: 'Email', value: 'email' },
    { heading: 'Phone', value: 'phone' },
    { heading: 'Password', value: 'password' }
  ];

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  return (
    <section className={styles.container}>
      <h2>Employee</h2>
      <Table data={employeesList} columns={columns} edit="/employee/profile" />
      <Button href="profile-form" style="squaredPrimary" disabled={false} text="Edit" />
    </section>
  );
};
export default EmployeeProfile;
