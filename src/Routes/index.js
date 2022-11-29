import { tokenListener } from 'Helpers/firebase';
import React, { lazy, Suspense, useEffect } from 'react';
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom';
import Home from 'Components/Home';
import 'index.css';
import PrivateRoute from 'Routes/PrivateRoutes';

const EmployeeLayout = lazy(() => import('Components/Layout/EmployeeLayout'));
const AdminLayout = lazy(() => import('Components/Layout/AdminLayout'));
const Login = lazy(() => import('Components/Pages/Auth/Login/index'));
const SignUp = lazy(() => import('Components/Pages/Auth/SignUp/index'));

const Routes = () => {
  useEffect(() => {
    tokenListener();
  }, []);
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <PrivateRoute path="/employee" role="EMPLOYEE" component={EmployeeLayout} />
          <PrivateRoute path="/admin" role="ADMIN" component={AdminLayout} />
          <Route path="/home" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/sign-up" component={SignUp} />
          <Route path="*">
            <Redirect to="/home" />
          </Route>
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
};

export default Routes;
