/* eslint-disable no-unused-vars */
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Header from 'Components/Header/index';
import Sidebar from 'Components/Sidebar/';
import Home from 'Components/Home/index';
import styles from 'Components/Layout/layout.module.css';
import Projects from 'Components/Projects/index';
import ProjectForm from 'Components/Projects/Form/index';
import TimeSheets from 'Components/TimeSheets/index';
import TimeSheetsForm from 'Components/TimeSheets/Form/index';

const Layout = () => {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.bodycontainer}>
        <Sidebar />
        <Switch>
          <Route path="/employee" component={Home} />
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
          <Route exact path="/employee/projects" component={Projects} />
          <Route exact path="/employee/project-form" component={ProjectForm} />
          <Route path="/employee/project-form/:id" component={ProjectForm} />
          <Route exact path="/employee/time-sheets" component={TimeSheets} />
          <Route exact path="/employee/time-sheet-form" component={TimeSheetsForm} />
          <Route path="/employee/time-sheet-form/:id" component={TimeSheetsForm} />
          {/* <Route exact path="/employee/account" component={} /> */}
          <Route path="*">
            <Redirect to="/home" />
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default Layout;
