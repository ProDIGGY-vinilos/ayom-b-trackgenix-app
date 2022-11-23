import { Link, useLocation } from 'react-router-dom';
import styles from 'Components/Shared/Sidebar/sidebar.module.css';

const Sidebar = ({ options, user }) => {
  const location = useLocation().pathname;

  return (
    <aside className={styles.container}>
      <div className={styles.routes}>
        {options.map((option, index) => {
          return (
            <Link
              key={index}
              className={location === option.link ? styles.selected : styles.listItem}
              to={option.link}
            >
              {option.label}
            </Link>
          );
        })}
      </div>
      <div className={styles.bottom}>
        <span className={styles.logout}>{user}</span>
        <Link className={styles.logout} to="/home">
          Log Out
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
