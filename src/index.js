import React, { lazy, Suspense } from 'react';
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom';
import Home from 'Components/Home';
import 'index.css';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import store from 'redux/store';

const EmployeeLayout = lazy(() => import('Components/Layout/EmployeeLayout'));
const AdminLayout = lazy(() => import('Components/Layout/AdminLayout'));

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route path="/employee" component={EmployeeLayout} />
            <Route path="/admin" component={AdminLayout} />
            <Route path="/home" component={Home} />
            <Route path="*">
              <Redirect to="/home" />
            </Route>
          </Switch>
        </Suspense>
      </BrowserRouter>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);
