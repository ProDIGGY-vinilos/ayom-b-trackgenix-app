import styles from 'Components/Shared/Header/header.module.css';
import logo from 'Components/Shared/Header/assets/logo.png';

const Header = ({ header }) => {
  return (
    <header className={styles.container}>
      <div className={styles.route}>{header}</div>
      <img className={styles.logo} src={logo} />
    </header>
  );
};

export default Header;
