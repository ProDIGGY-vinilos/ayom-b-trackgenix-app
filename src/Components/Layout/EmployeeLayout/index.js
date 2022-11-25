/* eslint-disable no-unused-vars */
import React, { lazy, Suspense } from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import createTitle from 'Helpers/create-title.js';
import Header from 'Components/Shared/Header/index';
import Sidebar from 'Components/Shared/Sidebar';
import styles from 'Components/Layout/EmployeeLayout/layout.module.css';

const ProjectsList = lazy(() => import('Components/Pages/Employee/ProjectList/index'));
const TimeSheets = lazy(() => import('Components/Pages/Employee/TimeSheetsList/index'));
const TimeSheetsForm = lazy(() => import('Components/Pages/Employee/TimeSheetsList/Form/index'));

const Layout = () => {
  const sideBarOptions = [
    { link: '/employee/projects', label: 'Projects' },
    { link: '/employee/timesheets', label: 'Timesheets' },
    { link: '/employee/profile', label: 'Profile' }
  ];
  let path = useLocation().pathname.split('/');
  path = path[path.length - 1];
  path = createTitle(path);
  return (
    <div className={styles.container}>
      <Header header={path} />
      <div className={styles.bodyContainer}>
        <Sidebar options={sideBarOptions} user={'Employee'} />
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route exact path="/employee/projects" component={ProjectsList} />
            <Route exact path="/employee/timesheets" component={TimeSheets} />
            <Route exact path="/employee/time-sheet-form" component={TimeSheetsForm} />
            <Route path="/employee/time-sheet-form/:id" component={TimeSheetsForm} />
            <Route path="/employee">
              <Redirect to="/employee/projects" />
            </Route>
            {/* <Route exact path="/employee/account" component={} /> */}
          </Switch>
        </Suspense>
      </div>
    </div>
  );
};

export default Layout;
