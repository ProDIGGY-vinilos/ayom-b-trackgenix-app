import React from 'react';
import 'index.css';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from 'redux/store';
import Routes from 'Routes/index';

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <Routes />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

export default Routes;
