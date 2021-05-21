import React, { Component } from "react";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBFormInline,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
} from "mdbreact";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";


import Home from "./pages/Home";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import ForgotPassword from "./pages/ForgotPassword";
import ChangePassword from "./pages/ChangePassword";
import Header from "./components/Header";
import Activated from "./pages/Activated";
import MainAdmin from "./layouts/Admin";
import Breadcrumb from "./components/Breadcrumb";
import FilmManager from "./pages/FilmManager";
import ShowtimeManager from "./pages/ShowtimeManager";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            <Header />
            <Home />
          </Route>
          <Route path="/dang-nhap">
            <Header />
            <SignIn />
          </Route>
          <Route path="/dang-ky">
            <Header />
            <SignUp />
          </Route>
          <Route path="/trang-ca-nhan">
            <Header />
            <Profile />
          </Route>
          <Route path="/quen-mat-khau">
            <Header />
            <ForgotPassword />
          </Route>
          <Route path="/doi-mat-khau">
            <Header />
            <ChangePassword />
          </Route>
          <Route path="/kich-hoat">
            <Header />
            <Activated />
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
        </Switch>
      </Router>
    );
  }
}

export default App;
