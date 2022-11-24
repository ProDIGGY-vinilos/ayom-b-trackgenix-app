/* eslint-disable no-unused-vars */
import React from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import Header from 'Components/Shared/Header/index';
import Sidebar from 'Components/Shared/Sidebar';
import styles from 'Components/Layout/EmployeeLayout/layout.module.css';
import ProjectsList from 'Components/Pages/Employee/ProjectList/index';
import ProjectForm from 'Components/Projects/Form/index';
import TimeSheets from 'Components/Pages/Employee/TimeSheetsList/index';
import TimeSheetsForm from 'Components/Pages/Employee/TimeSheetsList/Form/index';
import Home from 'Components/Home';
import createTitle from 'Helpers/create-title.js';

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
        <Switch>
          <Route exact path="/home" component={Home} />
          <Route exact path="/employee/projects" component={ProjectsList} />
          <Route exact path="/employee/timesheets" component={TimeSheets} />
          <Route exact path="/employee/time-sheet-form" component={TimeSheetsForm} />
          <Route path="/employee/time-sheet-form/:id" component={TimeSheetsForm} />
          <Route path="/employee">
            <Redirect to="/employee/projects" />
          </Route>
          {/* <Route exact path="/employee/account" component={} /> */}
        </Switch>
      </div>
    </div>
  );
};

export default Layout;