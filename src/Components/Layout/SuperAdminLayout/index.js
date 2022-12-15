/* eslint-disable no-unused-vars */
import React, { lazy, Suspense } from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import createTitle from 'Helpers/create-title.js';
import Header from 'Components/Shared/Header/index';
import Sidebar from 'Components/Shared/Sidebar';

const Admins = lazy(() => import('Components/Pages/SuperAdmin/Admins/AdminList/index'));
const AdminForm = lazy(() => import('Components/Pages/SuperAdmin/Admins/AdminForm/index'));
const MyProfile = lazy(() => import('Components/Pages/SuperAdmin/MyProfile/index'));
const MyProfileForm = lazy(() =>
  import('Components/Pages/SuperAdmin/MyProfile/MyProfileForm/index')
);

const SuperAdminLayout = () => {
  const sideBarOptions = [
    { link: '/super-admin/admins', label: 'Admins' },
    { link: '/super-admin/profile', label: 'Profile' }
  ];
  let path = useLocation().pathname.split('/');
  path = path[path.length - 1];
  path = createTitle(path);

  return (
    <div>
      <Header header={path} />
      <div>
        <Sidebar options={sideBarOptions} user={'Super Admin'} />
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route exact path="/super-admin/admins" component={Admins} />
            <Route exact path="/super-admin/admin-form" component={AdminForm} />
            <Route path="/super-admin/admin-form/:id" component={AdminForm} />
            <Route exact path="/super-admin/profile" component={MyProfile} />
            <Route path="/super-admin/profile-form/:id" component={MyProfileForm} />
            <Route path="/super-admin">
              <Redirect to="/super-admin/admins" />
            </Route>
          </Switch>
        </Suspense>
      </div>
    </div>
  );
};

export default SuperAdminLayout;
