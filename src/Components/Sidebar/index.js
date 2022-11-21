import { Link, useLocation } from 'react-router-dom';
import styles from 'Components/Sidebar/sidebar.module.css';

const Sidebar = () => {
  const location = useLocation().pathname;

  return (
    <aside className={styles.container}>
      <ul className={styles.rutes}>
        <li className={location === '/projects' && styles.selected}>
          <Link to="/projects">Projects</Link>
        </li>
        <li className={location === '/timesheets' && styles.selected}>
          <Link to="/timesheets">TimeSheets</Link>
        </li>
        <li className={location === '/profile' && styles.selected}>
          <Link to="/profile">Profile</Link>
        </li>
      </ul>
      <h1 className={styles.logout}>Log out</h1>
    </aside>
  );
};

export default Sidebar;
