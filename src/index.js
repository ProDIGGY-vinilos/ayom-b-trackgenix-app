import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Layout from 'Components/Layout';
import 'index.css';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import store from 'redux/store';

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);
