/* eslint-disable no-unused-vars */
import React, { lazy, Suspense } from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import createTitle from 'Helpers/create-title.js';
import Header from 'Components/Shared/Header/index';
import Sidebar from 'Components/Shared/Sidebar';
import styles from 'Components/Layout/AdminLayout/layout.module.css';

const Projects = lazy(() => import('Components/Projects/index'));
const ProjectForm = lazy(() => import('Components/Projects/Form/index'));
const TimeSheets = lazy(() => import('Components/TimeSheets/index'));
const TimeSheetsForm = lazy(() => import('Components/TimeSheets/Form/index'));
const SuperAdmins = lazy(() => import('Components/SuperAdmins/index'));
const SuperAdminForm = lazy(() => import('Components/SuperAdmins/Form/index'));
const Employees = lazy(() => import('Components/Employees/index'));
const EmployeeForm = lazy(() => import('Components/Employees/EmployeeForm'));
const Admins = lazy(() => import('Components/Admins/index'));
const AdminForm = lazy(() => import('Components/Admins/editAdminForm'));
const Tasks = lazy(() => import('Components/Tasks/index'));
const TasksForm = lazy(() => import('Components/Tasks/Form/index'));

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
        <Suspense fallback={<div>Loading...</div>}>
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
          </Switch>
        </Suspense>
      </div>
    </div>
  );
};

export default AdminLayout;
