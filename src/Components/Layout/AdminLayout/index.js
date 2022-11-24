/* eslint-disable no-unused-vars */
import React from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import Header from 'Components/Shared/Header/index';
import Sidebar from 'Components/Shared/Sidebar';
import styles from 'Components/Layout/AdminLayout/layout.module.css';
import Projects from 'Components/Projects/index';
import ProjectForm from 'Components/Projects/Form/index';
import TimeSheets from 'Components/TimeSheets/index';
import TimeSheetsForm from 'Components/TimeSheets/Form/index';
import SuperAdmins from 'Components/SuperAdmins/index';
import SuperAdminForm from 'Components/SuperAdmins/Form/index';
import Employees from 'Components/Employees/index';
import EmployeeForm from 'Components/Employees/EmployeeForm';
import Admins from 'Components/Admins/index';
import AdminForm from 'Components/Admins/editAdminForm';
import Tasks from 'Components/Tasks/index';
import TasksForm from 'Components/Tasks/Form/index';
import createTitle from 'Helpers/create-title.js';

const AdminLayout = () => {
  const sideBarOptions = [
    { link: '/admin/projects', label: 'Projects' },
    { link: '/admin/timesheets', label: 'Timesheets' },
    { link: '/admin/employees', label: 'Employees' },
    { link: '/admin/tasks', label: 'Tasks' },
    { link: '/admin/super-admins', label: 'Super Admins' },
    { link: '/admin/admins', label: 'Admins' },
    { link: '/admin/profile', label: 'Profile' }
  ];
  let path = useLocation().pathname.split('/');
  path = path[path.length - 1];
  path = createTitle(path);

  return (
    <div className={styles.container}>
      <Header header={path} />
      <div className={styles.bodyContainer}>
        <Sidebar options={sideBarOptions} user={'Admin'} />
        <Switch>
          <Route exact path="/admin/projects" component={Projects} />
          <Route exact path="/admin/project-form" component={ProjectForm} />
          <Route path="/admin/project-form/:id" component={ProjectForm} />
          <Route exact path="/admin/timesheets" component={TimeSheets} />
          <Route exact path="/admin/time-sheet-form" component={TimeSheetsForm} />
          <Route path="/admin/time-sheet-form/:id" component={TimeSheetsForm} />
          <Route exact path="/admin/tasks" component={Tasks} />
          <Route exact path="/admin/task-form" component={TasksForm} />
          <Route path="/admin/task-form/:id" component={TasksForm} />
          <Route exact path="/admin/super-admins" component={SuperAdmins} />
          <Route exact path="/admin/super-admin-form" component={SuperAdminForm} />
          <Route path="/admin/super-admin-form/:id" component={SuperAdminForm} />
          <Route exact path="/admin/admins" component={Admins} />
          <Route exact path="/admin/admin-form" component={AdminForm} />
          <Route path="/admin/admin-form/:id" component={AdminForm} />
          <Route exact path="/admin/employees" component={Employees} />
          <Route exact path="/admin/employee-form" component={EmployeeForm} />
          <Route path="/admin/employee-form/:id" component={EmployeeForm} />
          <Route path="/admin">
            <Redirect to="/admin/projects" />
          </Route>
          {/* <Route exact path="/admin/account" component={} /> */}
        </Switch>
      </div>
    </div>
  );
};

export default AdminLayout;
