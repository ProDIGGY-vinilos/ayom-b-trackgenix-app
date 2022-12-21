import React, { lazy } from 'react';
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
const Tasks = lazy(() => import('Components/Pages/Admin/Tasks/Task List/index'));
const TaskForm = lazy(() => import('Components/Pages/Admin/Tasks/Task Form/index'));

const AdminLayout = () => {
  const sideBarOptions = [
    { link: '/admin/projects', label: 'Projects' },
    { link: '/admin/tasks', label: 'Tasks' },
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
      <Route exact path="/admin/tasks" component={Tasks} />
      <Route exact path="/admin/task-form" component={TaskForm} />
      <Route path="/admin/task-form/:id" component={TaskForm} />
      <Route path="/admin">
        <Redirect to="/admin/projects" />
      </Route>
    </Layout>
  );
};

export default AdminLayout;
