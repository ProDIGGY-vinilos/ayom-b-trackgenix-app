/* eslint-disable no-unused-vars */
import React, { lazy, Suspense } from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';
import createTitle from 'Helpers/create-title.js';
import Layout from 'Components/Shared/Layout';

const ProjectsList = lazy(() => import('Components/Pages/Employee/ProjectList/index'));
const TimeSheets = lazy(() => import('Components/Pages/Employee/TimeSheetsList/index'));
const TimeSheetsForm = lazy(() => import('Components/Pages/Employee/TimeSheetsList/Form/index'));
const MyProfile = lazy(() => import('Components/Pages/Employee/MyProfile/MyProfile'));
const MyProfileForm = lazy(() => import('Components/Pages/Employee/MyProfile/MyProfileEdit'));

const EmployeeLayout = () => {
  const sideBarOptions = [
    { link: '/employee/projects', label: 'Projects' },
    { link: '/employee/timesheets', label: 'Timesheets' },
    { link: '/employee/profile', label: 'Profile' }
  ];
  let path = useLocation().pathname.split('/');
  path = path[path.length - 1];
  path = createTitle(path);
  return (
    <Layout sidebarOptions={sideBarOptions} user={'Employee'} path={path}>
      <Route exact path="/employee/projects" component={ProjectsList} />
      <Route exact path="/employee/timesheets" component={TimeSheets} />
      <Route exact path="/employee/time-sheet-form" component={TimeSheetsForm} />
      <Route path="/employee/time-sheet-form/:id" component={TimeSheetsForm} />
      <Route exact path="/employee/profile" component={MyProfile} />
      <Route exact path="/employee/profile-form" component={MyProfileForm} />
      <Route path="/employee">
        <Redirect to="/employee/projects" />
      </Route>
    </Layout>
  );
};

export default EmployeeLayout;
