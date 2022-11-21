import { Link } from 'react-router-dom';
import styles from 'Components/Sidebar/sidebar.module.css';

const Sidebar = () => {
  return (
    <aside className={styles.container}>
      <ul className={styles.rutes}>
        <li>
          <Link to="/projects">Projects</Link>
        </li>
        <li>
          <Link to="/timesheets">TimeSheets</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
