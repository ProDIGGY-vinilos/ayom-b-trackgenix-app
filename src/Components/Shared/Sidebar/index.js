import { Link, useLocation } from 'react-router-dom';
import styles from 'Components/Shared/Sidebar/sidebar.module.css';

const Sidebar = ({ array, user }) => {
  const location = useLocation().pathname;

  return (
    <aside className={styles.container}>
      <ul className={styles.routes}>
        {array.map((element, index) => {
          return (
            <li
              key={index}
              className={location === element.link ? styles.selected : styles.listItem}
            >
              <Link className={styles.link} to={element.link}>
                {element.label}
              </Link>
            </li>
          );
        })}
      </ul>
      <div className={styles.bottom}>
        <h1 className={styles.logout}>{user}</h1>
        <Link className={styles.logout} to="/home">
          Log Out
        </Link>
        {/* <h1 className={styles.logout}>Log out</h1> */}
      </div>
    </aside>
  );
};

export default Sidebar;
