import { MDBListGroup, MDBListGroupItem, MDBNavLink, MDBIcon } from 'mdbreact';
import styles from "./style.module.scss";
import logo from "~/assets/images/logo.svg"
import { useDispatch } from "react-redux";
import { dangXuatAction } from "../../redux/actions/NguoiDungAction";
import { TOKEN, USERLOGIN } from "../../util/constants/settingSystem";

const SideNav = () => {

  const dispatch = useDispatch()
  
  const logOut = () => {
    dispatch(dangXuatAction())
    localStorage.removeItem(USERLOGIN);
    localStorage.removeItem(TOKEN);
  }

  return (
    <div className={styles.sidebar}>
      <MDBListGroup style={{ width: "100%" }}>
        <MDBListGroupItem>
          <MDBNavLink to="/">
            <img
              className={styles.sidebar_logo}
              src={logo}
              alt="logo"
            />
          </MDBNavLink>
        </MDBListGroupItem>
        <MDBListGroupItem>
          <MDBNavLink to="/admin">
            <MDBIcon icon="chart-pie" className="mr-3" />
            Thống kê
          </MDBNavLink>
        </MDBListGroupItem>
        <MDBListGroupItem>
          <MDBNavLink to="/admin/quan-ly-khach-hang">
            <MDBIcon icon="user" className="mr-3" />
            Quản lý khách hàng
          </MDBNavLink>
        </MDBListGroupItem>
        <MDBListGroupItem>
          <MDBNavLink to="/admin/danh-sach-phim">
            <MDBIcon icon="film" className="mr-3" />
            Quản lý phim
          </MDBNavLink>
        </MDBListGroupItem>
        <MDBListGroupItem>
          <MDBNavLink to="/admin/quan-ly-suat-chieu">
            <MDBIcon far icon="calendar-alt" className="mr-3" />
            Quản lý suất chiếu
          </MDBNavLink>
        </MDBListGroupItem>
        <MDBListGroupItem>
          <MDBNavLink to="/admin/quan-ly-he-thong-rap">
            <MDBIcon icon="gopuram" className="mr-3" />
            Quản lý hệ thống rạp
          </MDBNavLink>
        </MDBListGroupItem>
        <MDBListGroupItem>
          <MDBNavLink to="/admin/quan-ly-cum-rap">
            <MDBIcon fas icon="cubes" className="mr-3" />
            Quản lý cụm rạp
          </MDBNavLink>
        </MDBListGroupItem>
        <MDBListGroupItem>
          <MDBNavLink to="/admin/quan-ly-rap">
            <MDBIcon icon="couch" className="mr-3" />
            Quản lý rạp
          </MDBNavLink>
        </MDBListGroupItem>


        <MDBListGroupItem className={styles.logOut} onClick={logOut}>
            <MDBIcon icon="sign-out-alt" className="mr-3" />
            Đăng xuất
        </MDBListGroupItem>

        {/* <MDBListGroupItem>
          <a className={styles.dropdown_menu}>
            <MDBIcon icon="couch" className="mr-3" />
              Dropdown
              <MDBListGroup>
              <MDBListGroupItem>
                <MDBNavLink to="/admin/cau-hinh-ghe">
                  <MDBIcon icon="couch" className="mr-3" />
            Cấu hình ghế
          </MDBNavLink>
              </MDBListGroupItem>
              <MDBListGroupItem>
                <MDBNavLink to="/admin/cau-hinh-ghe">
                  <MDBIcon icon="couch" className="mr-3" />
            Cấu hình ghế
          </MDBNavLink>
              </MDBListGroupItem>
              <MDBListGroupItem>
                <MDBNavLink to="/admin/cau-hinh-ghe">
                  <MDBIcon icon="couch" className="mr-3" />
            Cấu hình ghế
          </MDBNavLink>
              </MDBListGroupItem>
            </MDBListGroup>
          </a>
        </MDBListGroupItem> */}

      </MDBListGroup>

    </div>
  );
};

export default SideNav;

