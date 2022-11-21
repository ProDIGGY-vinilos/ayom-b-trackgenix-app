import styles from 'Components/Header/header.module.css';
import { Switch, Route } from 'react-router-dom';

const myAccount = (title) => {
  return <div className={styles.route}>{title}</div>;
};

const Header = () => {
  return (
    <header className={styles.container}>
      <div className={styles.appName}>
        Track<span>GENIX</span>
      </div>
      <Switch>
        <Route exact path="/profile" component={() => myAccount('Profile')} />
        <Route exact path="/timesheets" component={() => myAccount('TimeSheets')} />
        <Route exact path="/projects" component={() => myAccount('Projects')} />
      </Switch>
      <h1 className={styles.logout}>Log out</h1>
    </header>
  );
};

export default Header;
