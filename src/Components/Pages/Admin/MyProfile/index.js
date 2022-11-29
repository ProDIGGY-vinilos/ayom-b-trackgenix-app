import { useEffect } from 'react';
import styles from 'Components/Employees/employees.module.css';
import Table from 'Components/Shared/Table';
import Button from 'Components/Shared/Button/Button';
import { useSelector, useDispatch } from 'react-redux';
import { getOneAdmin } from 'redux/admins/thunks';

const AdminProfile = () => {
  const dispatch = useDispatch();
  const { list: adminsList, isLoading } = useSelector((state) => state.admins);
  const adminId = '636d720f757f0ced2671fe72';
  const token = sessionStorage.getItem('token');

  useEffect(() => {
    dispatch(getOneAdmin(adminId, token));
  }, []);

  const columns = [
    { heading: 'Name', value: 'name' },
    { heading: 'Last Name', value: 'lastName' },
    { heading: 'Email', value: 'email' },
    { heading: 'Password', value: 'password' }
  ];

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  return (
    <section className={styles.container}>
      <h2>Admin</h2>
      <Table data={adminsList} columns={columns} edit="/employee/profile" />
      <Button
        href={`profile-form/${adminId}`}
        style="squaredPrimary"
        disabled={false}
        text="Edit"
      />
    </section>
  );
};
export default AdminProfile;
