/* eslint-disable no-unused-vars */
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Header from 'Components/Header/index';
import Footer from 'Components/Footer/index';
import Admins from 'Components/Admins/index';
import AdminForm from 'Components/Admins/editAdminForm';
import SuperAdmins from 'Components/SuperAdmins/index';
import SuperAdminForm from 'Components/SuperAdmins/Form/index';
import Home from 'Components/Home/index';
import styles from 'Components/Layout/layout.module.css';
import Employees from 'Components/Employees/index';
import Projects from 'Components/Projects/index';
import ProjectForm from 'Components/Projects/Form/index';
import TimeSheets from 'Components/TimeSheets/index';
import TimeSheetsForm from 'Components/TimeSheets/Form/index';
import Tasks from 'Components/Tasks/index';
import EmployeeForm from 'Components/Employees/EmployeeForm';
import TasksForm from 'Components/Tasks/Form/index';
import ProjectList from 'Components/Pages/Employee/ProjectList';

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
        <Route exact path="/projects/employee" component={ProjectList} />
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
