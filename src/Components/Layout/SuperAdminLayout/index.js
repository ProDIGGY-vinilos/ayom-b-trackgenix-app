/* eslint-disable no-unused-vars */
import React, { lazy, Suspense } from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import createTitle from 'Helpers/create-title.js';
import Header from 'Components/Shared/Header/index';
import Sidebar from 'Components/Shared/Sidebar';

const Admins = lazy(() => import('Components/Admins/index'));
const AdminForm = lazy(() => import('Components/Admins/editAdminForm'));

const AdminLayout = () => {
  const sideBarOptions = [
    { link: '/admin/admins', label: 'Admins' },
    { link: '/admin/profile', label: 'Profile' }
  ];
  let path = useLocation().pathname.split('/');
  path = path[path.length - 1];
  path = createTitle(path);

  return (
    <div>
      <Header header={path} />
      <div>
        <Sidebar options={sideBarOptions} user={'Admin'} />
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route exact path="/super-admin/admins" component={Admins} />
            <Route exact path="/super-admin/admin-form" component={AdminForm} />
            <Route path="/super-admin/admin-form/:id" component={AdminForm} />
            <Route path="/super-admin">
              <Redirect to="/super-admin/admins" />
            </Route>
          </Switch>
        </Suspense>
      </div>
    </div>
  );
};

export default AdminLayout;
