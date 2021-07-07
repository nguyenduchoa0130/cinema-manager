import React, { useState } from "react";
import { MDBNavbar, MDBNavbarBrand, MDBNavbarToggler, MDBCollapse, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBContainer } from 'mdbreact';
import { useDispatch } from "react-redux";
import { dangXuatAction } from "../../redux/actions/NguoiDungAction";
import { TOKEN, USERLOGIN } from "../../util/constants/settingSystem";
import styles from "./style.module.scss";
import { Button, Dropdown, Menu } from "antd";
import { HistoryOutlined, PieChartOutlined, PoweroffOutlined, SolutionOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import Swal from "sweetalert2";


export default function Header() {
  let taiKhoanNguoiDung = '';
  let tenNguoiDung = '';
  let isAdmin = false;
  if (localStorage.getItem(USERLOGIN)) {
    let userLogin = JSON.parse(localStorage.getItem(USERLOGIN));
    taiKhoanNguoiDung = userLogin.email;
    tenNguoiDung = userLogin.fullName;
    isAdmin = userLogin.isAdmin;
  }
  const [state, setState] = useState({
    isOpen: false
  })

  const dispatch = useDispatch()

  const toggleCollapse = () => {
    setState({ isOpen: !state.isOpen });
  }

  const logOut = () => {

    Swal.fire({
      title: 'Xác nhận',
      text: "Bạn có muốn đăng xuất?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Hủy',
      confirmButtonText: 'Đăng xuất'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(dangXuatAction())
        localStorage.removeItem(USERLOGIN);
        localStorage.removeItem(TOKEN);
        window.location.reload();
      }
    })

  }

  const dropdownProfile = (
    <Menu className={styles.dropdownProfile}>
      <Menu.Item className={styles.item_user}>
        <i class="fas fa-user-circle"></i>
        <div>
          <span>Xin chào!</span>
          <strong className={styles.info_name}>{tenNguoiDung}</strong>
        </div>
      </Menu.Item>
      <Menu.Divider />
      {isAdmin ? <Menu.Item className={styles.item_information} >
        <Link to='/admin' >
          <PieChartOutlined />
          Admin
        </Link>
      </Menu.Item> : ''}
      <Menu.Item className={styles.item_information} >
        <Link to='/thong-tin-ca-nhan' >
          <SolutionOutlined />
          Thông tin cá nhân
        </Link>
      </Menu.Item>
      <Menu.Item className={styles.item_information}>
        <Link to='/lich-su' >
          <HistoryOutlined />
          Lịch sử giao dịch
        </Link>
      </Menu.Item>
      <Menu.Item className={styles.item_information}>
        <Link to='' onClick={logOut} ><PoweroffOutlined />Đăng xuất</Link>
      </Menu.Item>
    </Menu>
  );


  return (
    <MDBNavbar color="#0c2738" dark expand="md" className="boder-bottom">
      <MDBContainer>
        <MDBNavbarBrand>
          <MDBNavLink to="/">
            <strong className={styles.brand}>CineJun</strong>
          </MDBNavLink>
        </MDBNavbarBrand>
        <MDBNavbarNav right>
            <MDBNavItem>
              {taiKhoanNguoiDung !== '' ?
                <Dropdown overlay={dropdownProfile} trigger={['click']} placement="bottomRight" className={styles.dropdown}>
                  <Button href="/" className={styles.after_login} type="default"
                    icon={<UserOutlined className={styles.icons} />}
                    size="large">
                    {tenNguoiDung}
                  </Button>
                </Dropdown> :
                <Link to='/dang-nhap'>
                  <Button className={styles.dropdown} type="default"
                    size="large">
                    Đăng nhập
                  </Button>
                </Link>
              }
            </MDBNavItem>
          </MDBNavbarNav>
        
      </MDBContainer>
    </MDBNavbar>
  );
};
