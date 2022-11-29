/* eslint-disable no-unused-vars */
import React, { lazy, Suspense } from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import createTitle from 'Helpers/create-title.js';
import Header from 'Components/Shared/Header/index';
import Sidebar from 'Components/Shared/Sidebar';
import styles from 'Components/Layout/AdminLayout/layout.module.css';

const Projects = lazy(() => import('Components/Pages/Admin/Projects/ProjectList/index'));
const ProjectForm = lazy(() => import('Components/Pages/Admin/Projects/ProjectForm/index'));
const Employees = lazy(() => import('Components/Pages/Admin/Employees/EmployeeList/index'));
const EmployeeForm = lazy(() => import('Components/Pages/Admin/Employees/EmployeeForm/index'));
const TimeSheets = lazy(() => import('Components/Pages/Admin/TimeSheetsList/index'));
const MyProfile = lazy(() => import('Components/Pages/Admin/MyProfile/index'));
const MyProfileForm = lazy(() => import('Components/Pages/Admin/MyProfile/MyProfileForm/index'));

const AdminLayout = () => {
  const sideBarOptions = [
    { link: '/admin/projects', label: 'Projects' },
    { link: '/admin/employees', label: 'Employees' },
    { link: '/admin/timesheets', label: 'TimeSheets' },
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
            <Route exact path="/admin/employees" component={Employees} />
            <Route exact path="/admin/employee-form" component={EmployeeForm} />
            <Route path="/admin/employee-form/:id" component={EmployeeForm} />
            <Route exact path="/admin/timesheets" component={TimeSheets} />
            <Route exact path="/admin/profile" component={MyProfile} />
            <Route exact path="/admin/profile-form" component={MyProfileForm} />
            <Route path="/admin/profile-form/:id" component={MyProfileForm} />
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
