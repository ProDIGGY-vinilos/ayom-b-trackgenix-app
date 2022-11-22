import Sidebar from 'Components/Shared/Sidebar';
import Header from 'Components/Header/index';
import styles from 'Components/Layour/layour.module.css';

const Layout = ({ Switch }) => {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.bodycontainer}>
        <Sidebar />
        {Switch}
      </div>
    </div>
  );
};

export default Layout;
