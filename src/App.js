import React, { Component } from "react";
import {
  MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBFormInline,
  MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem
} from "mdbreact";
import { createBrowserHistory } from 'history';
import { Route, Switch, Router } from 'react-router-dom';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

import Activated from './pages/Activated';
import ActiveForgetPassword  from './pages/ActiveForgetPassword';
import Home from './pages/Home';
import Profile from './pages/Profile';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import ForgotPassword from './pages/ForgotPassword';
import ChangePassword from './pages/ChangePassword';
import Header from './components/Header';



export const history = createBrowserHistory();



class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Header />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/dang-nhap">
            <SignIn />
          </Route>
          <Route path="/dang-ky">
            <SignUp />
          </Route>
          <Route path="/trang-ca-nhan">
            <Profile />
          </Route>
          <Route path="/quen-mat-khau">
            <ForgotPassword />
          </Route>
          <Route path="/doi-mat-khau">
            <ChangePassword />
          </Route>
          <Route path="/kich-hoat">
            <Activated />
          </Route>
          <Route path="/xac-nhan-otp">
            <ActiveForgetPassword />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;