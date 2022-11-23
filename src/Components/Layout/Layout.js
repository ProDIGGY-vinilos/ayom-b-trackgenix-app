import Sidebar from 'Components/Shared/Sidebar';
import Header from 'Components/Header/index';
import styles from 'Components/LayouT/layout.module.css';

const Layout = ({ Children }) => {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.bodyContainer}>
        <Sidebar />
        {Children}
      </div>
    </div>
  );
};

export default Layout;
