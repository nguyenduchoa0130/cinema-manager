import React, { Component } from "react";
import {
MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBFormInline,
MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem
} from "mdbreact";
import { BrowserRouter as Router,Route, Switch } from 'react-router-dom';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

import Home from './pages/Home';
import Profile from './pages/Profile';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import ForgotPassword from './pages/ForgotPassword';
import ChangePassword from './pages/ChangePassword';
import Activated from './pages/Activated';class App extends Component {
state = {
  isOpen: false
};

toggleCollapse = () => {
  this.setState({ isOpen: !this.state.isOpen });
}

render() {
  return (
    <Router>
      <MDBNavbar color="indigo" dark expand="md">
        <MDBNavbarBrand>
          <strong className="white-text">Navbar</strong>
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={this.toggleCollapse} />
        <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
          <MDBNavbarNav left>
            <MDBNavItem active>
              <MDBNavLink to="/">Trang chủ</MDBNavLink>
            </MDBNavItem>
            
            <MDBNavItem>
              <MDBNavLink to="/dang-nhap">Đăng nhập</MDBNavLink>
            </MDBNavItem>

            <MDBNavItem>
              <MDBNavLink to="/dang-ky">Đăng ký</MDBNavLink>
            </MDBNavItem>

            <MDBNavItem>
              <MDBNavLink to="/trang-ca-nhan">Thông tin cá nhân</MDBNavLink>
            </MDBNavItem>
            
            <MDBNavItem>
              <MDBNavLink to="/quen-mat-khau">Quên mật khẩu</MDBNavLink>
            </MDBNavItem>

            <MDBNavItem>
              <MDBNavLink to="/doi-mat-khau">Đổi mật khẩu</MDBNavLink>
            </MDBNavItem>
            
            <MDBNavItem>
              <MDBNavLink to="/kich-hoat">OTP</MDBNavLink>
            </MDBNavItem>
           </MDBNavbarNav>
          <MDBNavbarNav right>
            <MDBNavItem>
              <MDBFormInline waves>
                <div className="md-form my-0">
                  <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" />
                </div>
              </MDBFormInline>
            </MDBNavItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
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
      </Switch>
    </Router>
    );
  }
}

export default App;