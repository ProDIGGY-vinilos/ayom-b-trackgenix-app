import { Link, useLocation } from 'react-router-dom';
import styles from 'Components/Shared/Sidebar/sidebar.module.css';
import Button from 'Components/Shared/Button/Button';
import { logout } from 'redux/auth/thunks';
import { useDispatch, useSelector } from 'react-redux';

const Sidebar = ({ options, user }) => {
  const location = useLocation().pathname;
  useSelector((state) => state.auth);
  const dispatch = useDispatch();

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
        <Button
          onClick={() => {
            dispatch(logout());
          }}
          style="squaredPrimary"
          disabled={false}
          text="Log Out"
        />
      </div>
    </aside>
  );
};

export default Sidebar;
