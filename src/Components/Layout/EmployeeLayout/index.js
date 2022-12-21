import React, { lazy, Suspense } from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import createTitle from 'Helpers/create-title.js';
import Header from 'Components/Shared/Header/index';
import Sidebar from 'Components/Shared/Sidebar';
import styles from 'Components/Layout/EmployeeLayout/layout.module.css';
import LoadingModal from 'Components/Shared/Loading';

const ProjectsList = lazy(() => import('Components/Pages/Employee/ProjectList/index'));
const TimeSheets = lazy(() => import('Components/Pages/Employee/TimeSheetsList/index'));
const TimeSheetsForm = lazy(() => import('Components/Pages/Employee/TimeSheetsList/Form/index'));
const MyProfile = lazy(() => import('Components/Pages/Employee/MyProfile/MyProfile'));
const MyProfileForm = lazy(() => import('Components/Pages/Employee/MyProfile/MyProfileEdit'));

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
        <Suspense fallback={<LoadingModal />}>
          <Switch>
            <Route exact path="/employee/projects" component={ProjectsList} />
            <Route exact path="/employee/timesheets" component={TimeSheets} />
            <Route exact path="/employee/time-sheet-form/:id" component={TimeSheetsForm} />
            <Route exact path="/employee/profile" component={MyProfile} />
            <Route exact path="/employee/profile-form" component={MyProfileForm} />
            <Route exact path="/employee/profile-form/:id" component={MyProfileForm} />
            <Route path="/employee">
              <Redirect to="/employee/projects" />
            </Route>
          </Switch>
        </Suspense>
      </div>
    </div>
  );
};

export default Layout;
