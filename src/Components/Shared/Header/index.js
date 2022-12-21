import styles from 'Components/Shared/Header/header.module.css';
import logo from 'Components/Shared/Header/assets/logo.png';

const Header = ({ header }) => {
  return (
    <header className={styles.container}>
      <img className={styles.logo} src={logo} />
      <div className={styles.route}>{header}</div>
    </header>
  );
};

export default Header;
