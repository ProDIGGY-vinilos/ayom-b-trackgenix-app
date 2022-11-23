import styles from 'Components/Shared/Header/header.module.css';
import logo from 'Components/Shared/Header/assets/logo.png';

const Header = ({ Title }) => {
  return (
    <header className={styles.container}>
      <img className={styles.logo} src={logo} />
      <div className={styles.route}>{Title}</div>
    </header>
  );
};

export default Header;
