import React, { lazy } from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';
import createTitle from 'Helpers/create-title.js';
import Layout from 'Components/Shared/Layout';

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
    <Layout sidebarOptions={sideBarOptions} user={'Super Admin'} path={path}>
      <Route exact path="/super-admin/admins" component={Admins} />
      <Route exact path="/super-admin/admin-form" component={AdminForm} />
      <Route path="/super-admin/admin-form/:id" component={AdminForm} />
      <Route exact path="/super-admin/profile" component={MyProfile} />
      <Route path="/super-admin/profile-form/:id" component={MyProfileForm} />
      <Route path="/super-admin">
        <Redirect to="/super-admin/admins" />
      </Route>
    </Layout>
  );
};

export default SuperAdminLayout;
