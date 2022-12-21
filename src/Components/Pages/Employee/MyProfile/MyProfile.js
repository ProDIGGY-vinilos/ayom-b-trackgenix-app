import { useEffect } from 'react';
import styles from 'Components/Employees/employees.module.css';
import Table from 'Components/Shared/Table';
import Button from 'Components/Shared/Button/Button';
import { useSelector, useDispatch } from 'react-redux';
import { getEmployeeByFirebaseUid } from 'redux/employees/thunks';
import LoadingModal from 'Components/Shared/Loading';

const EmployeeProfile = () => {
  const dispatch = useDispatch();
  const { list: employeesList, isLoading } = useSelector((state) => state.employees);
  const { firebaseUid } = useSelector((state) => state.auth);
  const token = sessionStorage.getItem('token');

  useEffect(() => {
    if (!employeesList.length || employeesList.length > 1) {
      dispatch(getEmployeeByFirebaseUid(firebaseUid, token));
    }
  }, []);

  const columns = [
    { heading: 'Name', value: 'name' },
    { heading: 'Last Name', value: 'lastName' },
    { heading: 'Email', value: 'email' },
    { heading: 'Phone', value: 'phone' },
    { heading: 'Password', value: 'password' }
  ];

  if (isLoading) {
    return <LoadingModal />;
  }

  return (
    <section className={styles.container}>
      <Table data={employeesList} columns={columns} edit="/employee/profile" />
      <Button
        href={`profile-form/${employeesList[0]?._id}`}
        style="squaredPrimary"
        disabled={false}
        text="Edit"
      />
    </section>
  );
};
export default EmployeeProfile;
