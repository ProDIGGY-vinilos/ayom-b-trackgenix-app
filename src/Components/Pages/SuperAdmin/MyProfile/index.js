import { useEffect } from 'react';
import styles from 'Components/Employees/employees.module.css';
import Table from 'Components/Shared/Table';
import Button from 'Components/Shared/Button/Button';
import { useSelector, useDispatch } from 'react-redux';
import { getOneSuperAdmin } from 'redux/superAdmins/thunks';

const SuperAdminProfile = () => {
  const dispatch = useDispatch();
  const { list: superAdminsList, isLoading } = useSelector((state) => state.superAdmins);
  const superAdminId = '638f920fd9cb9c970c557bc5';
  const token = sessionStorage.getItem('token');

  useEffect(() => {
    dispatch(getOneSuperAdmin(superAdminId, token));
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
      <h2>Super Admin</h2>
      <Table data={superAdminsList} columns={columns} edit="/super-admin/profile" />
      <Button
        href={`profile-form/${superAdminId}`}
        style="squaredPrimary"
        disabled={false}
        text="Edit"
      />
    </section>
  );
};
export default SuperAdminProfile;
