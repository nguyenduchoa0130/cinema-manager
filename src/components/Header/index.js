import React, { useState } from "react";
import { MDBNavbar, MDBNavbarBrand, MDBNavbarToggler, MDBCollapse, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBContainer } from 'mdbreact';
import { useDispatch } from "react-redux";
import { dangXuatAction } from "../../redux/actions/NguoiDungAction";
import { TOKEN, USERLOGIN } from "../../util/constants/settingSystem";
import styles from "./style.module.scss";
import { Button, Dropdown, Menu } from "antd";
import { HistoryOutlined, PieChartOutlined, PoweroffOutlined, SolutionOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";


export default function Header() {

  const [state, setState] = useState({
    isOpen: false
  })

  const dispatch = useDispatch()

  const toggleCollapse = () => {
    setState({ isOpen: !state.isOpen });
  }

  const logOut = () => {
    dispatch(dangXuatAction())
    localStorage.removeItem(USERLOGIN);
    localStorage.removeItem(TOKEN);
    window.location.reload()
  }

  const dropdownProfile = (
    <Menu className={styles.dropdownProfile}>
      <Menu.Item className={styles.item_user}>
        <i class="fas fa-user-circle"></i>
        <div>
          <span>Xin chào!</span>
          <strong className={styles.info_name}>Minh Hiếu</strong>
        </div>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item className={styles.item_information} >
        <Link to='/admin' >
          <PieChartOutlined />
          Admin
        </Link>
      </Menu.Item>
      <Menu.Item className={styles.item_information} >
        <Link to='/thong-tin-ca-nhan' >
          <SolutionOutlined />
          Thông tin cá nhân
        </Link>
      </Menu.Item>
      <Menu.Item className={styles.item_information}>
        <Link to='lich-su' >
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
        <MDBNavbarToggler onClick={toggleCollapse} />
        <MDBCollapse id="navbarCollapse3" isOpen={state.isOpen} navbar>
          <MDBNavbarNav right>
            <MDBNavItem>
              <Dropdown overlay={dropdownProfile} trigger={['click']} placement="bottomRight" className={styles.dropdown}>
                <Button href="/" className={styles.after_login} type="default"
                  icon={<UserOutlined className={styles.icons} />}
                  size="large">
                  Minh Hiếu
                </Button>

              </Dropdown>
              <Link to='dang-nhap'>
                <Button className={styles.dropdown} type="default"
                    size="large">
                    Đăng nhập
                </Button>
              </Link>
            </MDBNavItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
};
