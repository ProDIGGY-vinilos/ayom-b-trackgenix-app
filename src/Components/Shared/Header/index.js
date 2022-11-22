import styles from 'Components/Shared/Header/header.module.css';
import logo from 'Components/Shared/Header/assets/logo.png';
import Title from 'Components/Shared/Header/Title';

const Header = ({ header }) => {
  return (
    <header className={styles.container}>
      <img className={styles.logo} src={logo} />
      <Title title={header} />
    </header>
  );
};

export default Header;
