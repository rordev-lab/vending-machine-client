import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
// styles
import 'bootstrap/dist/css/bootstrap.min.css';
import './style/index.css';
import 'mdbreact/dist/css/mdb.css';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
