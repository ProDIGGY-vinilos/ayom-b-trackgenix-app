import Sidebar from 'Components/Shared/Sidebar';
import Header from 'Components/Shared/Header/index';
import styles from 'Components/Shared/Layout/layout.module.css';
import { Switch } from 'react-router-dom';
import React, { Suspense } from 'react';
import LoadingModal from 'Components/Shared/Loading';

const Layout = ({ children, sidebarOptions, user, path }) => {
  return (
    <div className={styles.container}>
      <Header header={path} />
      <div className={styles.bodyContainer}>
        <Sidebar options={sidebarOptions} user={user} />
        <Suspense fallback={<LoadingModal />}>
          <Switch>{children}</Switch>
        </Suspense>
      </div>
    </div>
  );
};

export default Layout;
