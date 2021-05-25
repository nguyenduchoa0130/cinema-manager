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
import MainAdmin from "./layouts/Admin";
import Breadcrumb from "./components/Breadcrumb";
import FilmManager from "./pages/FilmManager";
import ShowtimeManager from "./pages/ShowtimeManager";
import NonAuth from "./layouts/NonAuth";


export const history = createBrowserHistory();



class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/">
             <NonAuth children={<Home />}/>   
          </Route>
          <Route path="/dang-nhap">
            <NonAuth children={<SignIn />}/>   
          </Route>
          <Route path="/dang-ky">
            <NonAuth children={<SignUp />}/>   
          </Route>
          <Route path="/trang-ca-nhan">
            <NonAuth children={<Profile />}/>   
          </Route>
          <Route path="/quen-mat-khau">
            <NonAuth children={<ForgotPassword />}/>   
          </Route>
          <Route path="/doi-mat-khau">
            <NonAuth children={<ChangePassword />}/>   
          </Route>
          <Route path="/kich-hoat">
            <NonAuth children={<Activated />}/>   
          </Route>
          <Route path='/admin/:path?' exact>
            <MainAdmin>
              <Switch>
                <Route path='/admin' exact component={Breadcrumb}/>
                <Route path='/admin/danh-sach-phim' exact component={FilmManager} />
                <Route path='/admin/quan-ly-suat-chieu' exact component={ShowtimeManager} />
              </Switch>
            </MainAdmin>
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
