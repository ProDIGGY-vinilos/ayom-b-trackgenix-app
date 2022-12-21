import { useEffect } from 'react';
import styles from 'Components/Employees/employees.module.css';
import Table from 'Components/Shared/Table';
import Button from 'Components/Shared/Button/Button';
import { useSelector, useDispatch } from 'react-redux';
import { getSuperAdminByFirebaseUid } from 'redux/superAdmins/thunks';
import LoadingModal from 'Components/Shared/Loading';

const SuperAdminProfile = () => {
  const dispatch = useDispatch();
  const { list: superAdminsList, isLoading } = useSelector((state) => state.superAdmins);
  const { firebaseUid } = useSelector((state) => state.auth);
  const token = sessionStorage.getItem('token');

  useEffect(() => {
    if (!superAdminsList.length || superAdminsList.length > 1) {
      dispatch(getSuperAdminByFirebaseUid(firebaseUid, token));
    }
  }, []);

  const columns = [
    { heading: 'Name', value: 'name' },
    { heading: 'Last Name', value: 'lastName' },
    { heading: 'Email', value: 'email' },
    { heading: 'Password', value: 'password' }
  ];

  if (isLoading) {
    return <LoadingModal />;
  }

  return (
    <section className={styles.container}>
      <h2>Super Admin</h2>
      <Table data={superAdminsList} columns={columns} edit="/super-admin/profile" />
      <Button
        href={`profile-form/${superAdminsList[0]?._id}`}
        style="squaredPrimary"
        disabled={false}
        text="Edit"
      />
    </section>
  );
};
export default SuperAdminProfile;
