/* eslint-disable no-unused-vars */
import React, { lazy, Suspense } from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';
import createTitle from 'Helpers/create-title.js';
import Layout from 'Components/Shared/Layout';

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
    <Layout sidebarOptions={sideBarOptions} user={'Admin'} path={path}>
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
    </Layout>
  );
};

export default AdminLayout;
