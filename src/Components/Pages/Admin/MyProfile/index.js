import { useEffect } from 'react';
import styles from 'Components/Employees/employees.module.css';
import Table from 'Components/Shared/Table';
import Button from 'Components/Shared/Button/Button';
import { useSelector, useDispatch } from 'react-redux';
import { getAdminByFirebaseUid } from 'redux/admins/thunks';
import LoadingModal from 'Components/Shared/Loading';

const AdminProfile = () => {
  const dispatch = useDispatch();
  const { list: adminList, isLoading } = useSelector((state) => state.admins);
  const { firebaseUid } = useSelector((state) => state.auth);
  const token = sessionStorage.getItem('token');

  useEffect(() => {
    if (!adminList.length || adminList.length > 1) {
      dispatch(getAdminByFirebaseUid(firebaseUid, token));
    }
  }, []);

  const columns = [
    { heading: 'Name', value: 'name' },
    { heading: 'Last Name', value: 'lastName' },
    { heading: 'Email', value: 'email' },
    { heading: 'Password', value: 'password' }
  ];

  if (isLoading) {
    return (
      <section className={styles.container}>
        <LoadingModal />;
      </section>
    );
  }

  return (
    <section className={styles.container}>
      <Table data={adminList} columns={columns} edit="/admin/profile" />
      <Button
        href={`profile-form/${adminList[0]?._id}`}
        style="squaredPrimary"
        disabled={false}
        icon="edit"
      />
    </section>
  );
};
export default AdminProfile;
