import styles from 'Components/Home/home.module.css';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Home = (props) => {
  const { role } = useSelector((state) => state.auth);

  useEffect(() => {
    switch (role) {
      case 'EMPLOYEE':
        props.history.push('/employee');
        break;
      case 'ADMIN':
        props.history.push('/admin');
        break;
      case 'SUPER_ADMIN':
        props.history.push('/super-admin');
        break;
    }
  }, [role]);

  return (
    <section className={styles.container}>
      <div className={styles.title}>Home</div>
      <div>
        <Link className={styles.link} to="/login">
          Sign In
        </Link>
        <Link className={styles.link} to="/sign-up">
          Sign Up
        </Link>
      </div>
      <Link className={styles.link} to="/employee">
        Employee Page
      </Link>
      <Link className={styles.link} to="/admin">
        Admin Page
      </Link>
      <Link className={styles.link} to="/super-admin">
        Super Admin Page
      </Link>
    </section>
  );
};

export default Home;
