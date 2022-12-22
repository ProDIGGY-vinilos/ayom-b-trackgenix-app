import Sidebar from 'Components/Shared/Sidebar';
import Header from 'Components/Shared/Header/index';
import styles from 'Components/Shared/Layout/layout.module.css';
import { Switch } from 'react-router-dom';
import React, { Suspense } from 'react';
import LoadingModal from 'Components/Shared/Loading';

const Layout = ({ children, sidebarOptions, user, path }) => {
  return (
    <div className={styles.container}>
      <Sidebar options={sidebarOptions} user={user} />
      <div className={styles.bodyContainer}>
        <Header header={path} />
        <Suspense
          fallback={
            <div className={styles.spinnerContainer}>
              <LoadingModal />
            </div>
          }
        >
          <Switch>{children}</Switch>
        </Suspense>
      </div>
    </div>
  );
};

export default Layout;
