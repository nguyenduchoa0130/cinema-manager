import React, { useState } from "react";
import { MDBNavbar, MDBNavbarBrand, MDBNavbarToggler, MDBCollapse, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBFormInline } from 'mdbreact';
import { useDispatch } from "react-redux";
import { dangXuatAction } from "../../redux/actions/NguoiDungAction";
import { TOKEN, USERLOGIN } from "../../util/constants/settingSystem";


export default function Header() {

  const [state, setState] = useState({
    isOpen: false
  })

  const dispatch = useDispatch()

  const toggleCollapse = () => {
    setState({ isOpen: !state.isOpen });
  }
  return (
    <MDBNavbar color="#0c2738" dark expand="md" className="boder-bottom">
      <MDBNavbarBrand>
        <MDBNavLink to="/">
          <strong className="white-text">CineJun</strong>
        </MDBNavLink>
      </MDBNavbarBrand>
      <MDBNavbarToggler onClick={toggleCollapse} />
      <MDBCollapse id="navbarCollapse3" isOpen={state.isOpen} navbar>
        <MDBNavbarNav left>
          <MDBNavItem >
            <MDBNavLink to="/">Trang chủ</MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink to="/dang-nhap">Đăng nhập</MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <button onClick={() => {
              dispatch(dangXuatAction())
              localStorage.removeItem(USERLOGIN);
              localStorage.removeItem(TOKEN);
            }}>Đăng xuất</button>
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
            <MDBNavLink to="/thong-tin-ban-dau">Tạo thông tin ban đầu</MDBNavLink>
          </MDBNavItem>

          <MDBNavItem>
            <MDBNavLink to="/kich-hoat">OTP</MDBNavLink>
          </MDBNavItem>

          <MDBNavItem>
            <MDBNavLink to="/admin">Admin</MDBNavLink>
          </MDBNavItem>

          <MDBNavItem>
            <MDBNavLink to="/chi-tiet-phim">Chi tiết phim</MDBNavLink>
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
  );
};
