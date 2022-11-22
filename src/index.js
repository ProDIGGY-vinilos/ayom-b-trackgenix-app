import React from 'react';
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom';
import EmployeeLayout from 'Components/Layout/EmployeeLayout';
import AdminLayout from 'Components/Layout/AdminLayout';
import 'index.css';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import store from 'redux/store';

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <Switch>
          <Route path="/employee" component={EmployeeLayout} />
          <Route path="/admin" component={AdminLayout} />
          <Route path="/home" component={EmployeeLayout} />
          <Route path="*">
            <Redirect to="/home" />
          </Route>
        </Switch>
      </BrowserRouter>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);
