/* eslint-disable no-unused-vars */
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Header from '../Header/index';
import Footer from '../Footer/index';
import Admins from '../Admins/index';
import AdminForm from '../Admins/editAdminForm';
import SuperAdmins from '../SuperAdmins/index';
import SuperAdminForm from '../SuperAdmins/Form/index';
import Home from '../Home/index';
import styles from './layout.module.css';
import Employees from '../Employees/index';
import Projects from '../Projects';
import ProjectForm from '../Projects/Form/index';
import TimeSheets from '../TimeSheets';
import TimeSheetsForm from '../TimeSheets/Form';
import Tasks from '../Tasks/index';
import EmployeeForm from '../Employees/EmployeeForm';
import TasksForm from '../Tasks/Form/index';

const Layout = () => {
  return (
    <div className={styles.container}>
      <Header />
      <Switch>
        <Route path="/home" component={Home} />
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Route exact path="/admins" component={Admins} />
        <Route exact path="/admin-form" component={AdminForm} />
        <Route path="/admin-form/:id" component={AdminForm} />
        <Route exact path="/super-admins" component={SuperAdmins} />
        <Route exact path="/super-admin-form" component={SuperAdminForm} />
        <Route path="/super-admin-form/:id" component={SuperAdminForm} />
        <Route exact path="/employees" component={Employees} />
        <Route exact path="/employee-form" component={EmployeeForm} />
        <Route path="/employee-form/:id" component={EmployeeForm} />
        <Route exact path="/projects" component={Projects} />
        <Route exact path="/project-form" component={ProjectForm} />
        <Route path="/project-form/:id" component={ProjectForm} />
        <Route exact path="/time-sheets" component={TimeSheets} />
        <Route exact path="/time-sheet-form" component={TimeSheetsForm} />
        <Route path="/time-sheet-form/:id" component={TimeSheetsForm} />
        <Route exact path="/tasks" component={Tasks} />
        <Route exact path="/task-form" component={TasksForm} />
        <Route path="/task-form/:id" component={TasksForm} />
        <Route path="*">
          <Redirect to="/home" />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
};

export default Layout;
