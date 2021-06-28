import React from "react";
import { createBrowserHistory } from 'history';
import { Route, Switch, Router } from 'react-router-dom';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import 'antd/dist/antd.css';
import 'sweetalert2/dist/sweetalert2.css';

import Activated from './pages/Activated';
import ActiveForgetPassword from './pages/ActiveForgetPassword';
import Home from './pages/Home';
import Profile from './pages/Profile';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import ForgotPassword from './pages/ForgotPassword';
import ChangePassword from './pages/ChangePassword';
import MainAdmin from "./layouts/Admin";
import FilmManager from "./pages/Film/FilmManager";
import Auth from "./layouts/Auth";
import AddFilm from "./pages/Film/AddFilm";
import EditFilm from "./pages/Film/EditFilm";
import CustomerManager from "./pages/Customers/CustomerManager";
import EditCustomer from "./pages/Customers/EditCustomer";
import SystemManager from "./pages/SystemCinema/SystemManager";
import EditSystem from "./pages/SystemCinema/EditSystem";
import AddSystem from "./pages/SystemCinema/AddSystem";
import AddCustomer from "./pages/Customers/AddCustomer";
import AddCluster from "./pages/Cluster/AddCluster";
import EditCluster from "./pages/Cluster/EditCluster";
import ClusterManager from "./pages/Cluster/ClusterManager";
import CinemaManager from "./pages/Cinema/CinemaManager";
import AddCinema from "./pages/Cinema/AddCinema";
import EditCinema from "./pages/Cinema/EditCinema";
import AddShowtime from "./pages/Showtime/AddShowtime";
import EditShowtime from "./pages/Showtime/EditShowtime";
import ShowtimeManager from "./pages/Showtime/ShowtimeManager";
import FilmDetail from "./pages/FilmDetail";
import SignUpBySocial from "./pages/SignUpBySocial";
import SignInGoogle from "./pages/SignInGoogle";
import ChooseSeat from "./pages/Booking/ChooseSeat";
import Dashboard from "./pages/Dashboard";
import NonAuth from "./layouts/NonAuth";
import History from "./pages/History";


export const history = createBrowserHistory();



const App = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/">
          <Auth children={<Home />} />
        </Route>
        <Route path="/trang-ca-nhan">
          <Auth children={<Profile />} />
        </Route>
        <Route path="/lich-su">
          <Auth children={<History />} />
        </Route>
        
        <Route path="/dang-nhap">
          <NonAuth children={<SignIn />} />
        </Route>
        <Route path="/dang-ky">
          <NonAuth children={<SignUp />} />
        </Route>
        <Route path="/quen-mat-khau">
          <NonAuth children={<ForgotPassword />} />
        </Route>
        <Route path="/doi-mat-khau">
          <NonAuth children={<ChangePassword />} />
        </Route>

        <Route path="/hoan-tat-thong-tin-fb">
          <NonAuth children={<SignUpBySocial />} />
        </Route>
        <Route path="/hoan-tat-thong-tin-gg">
          <NonAuth children={<SignInGoogle />} />
        </Route>
        <Route path="/kich-hoat">
          <NonAuth children={<Activated />} />
        </Route>
        
        <Route path="/chi-tiet-phim/:id" component={FilmDetail}>
          {/* <Auth children={<FilmDetail />}/>       */}
        </Route>
        <Route path="/dat-ve/chon-ghe/:maLichChieu" component={ChooseSeat}></Route>
        {/* <Route path="/dat-ve/:path?" exact>
          <Switch>
            <Route path="/dat-ve/chon-ghe/:maLichChieu" component={ChooseSeat}>
            </Route>
          </Switch>
        </Route> */}


        <Route path='/admin/:path?' exact>
          <MainAdmin>
            <Switch>
              <Route path='/admin' exact component={Dashboard} />
              {/* Film */}
              <Route path='/admin/danh-sach-phim' component={FilmManager} />
              <Route path='/admin/them-phim' component={AddFilm} />
              <Route path='/admin/cap-nhat-phim' component={EditFilm} />
              {/* User */}
              <Route path='/admin/quan-ly-khach-hang' component={CustomerManager} />
              <Route path='/admin/cap-nhat-khach-hang' component={EditCustomer} />
              <Route path='/admin/them-khach-hang' component={AddCustomer} />
              {/* System */}
              <Route path='/admin/quan-ly-he-thong-rap' component={SystemManager} />
              <Route path='/admin/them-he-thong-rap' component={AddSystem} />
              <Route path='/admin/cap-nhat-he-thong-rap' component={EditSystem} />
              {/* Cluter */}
              <Route path='/admin/quan-ly-cum-rap' component={ClusterManager} />
              <Route path='/admin/them-cum-rap' component={AddCluster} />
              <Route path='/admin/cap-nhat-cum-rap' component={EditCluster} />
              {/* Cinema */}
              <Route path='/admin/quan-ly-rap' component={CinemaManager} />
              <Route path='/admin/them-rap' component={AddCinema} />
              <Route path='/admin/cap-nhat-rap' component={EditCinema} />

              {/* Showtime */}
              <Route path='/admin/quan-ly-suat-chieu' component={ShowtimeManager} />
              <Route path='/admin/them-suat-chieu' component={AddShowtime} />
              <Route path='/admin/cap-nhat-suat-chieu' component={EditShowtime} />

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

export default App;
