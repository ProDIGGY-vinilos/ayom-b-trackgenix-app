import styles from 'Components/Header/header.module.css';
import logo from 'Components/Header/assets/logo.png';
import { Switch, Route } from 'react-router-dom';

const myAccount = (title) => {
  return <div className={styles.route}>{title}</div>;
};

const Header = () => {
  return (
    <header className={styles.container}>
      <img className={styles.logo} src={logo} />
      <Switch>
        <Route exact path="/profile" component={() => myAccount('Profile')} />
        <Route exact path="/timesheets" component={() => myAccount('TimeSheets')} />
        <Route exact path="/projects" component={() => myAccount('Projects')} />
      </Switch>
    </header>
  );
};

export default Header;
