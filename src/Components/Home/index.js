import styles from 'Components/Home/home.module.css';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <section className={styles.container}>
      <div className={styles.title}>Home</div>
      <Link className={styles.link} to="/employee">
        Employee Page
      </Link>
      <Link className={styles.link} to="/admin">
        Admin Page
      </Link>
    </section>
  );
};

export default Home;
