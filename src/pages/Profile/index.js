
import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBListGroupItem, MDBListGroup } from 'mdbreact';
import styles from "./style.module.scss";
import cx from 'classnames';
import { useSelector } from "react-redux";

export default function Profile() {

    // const {taiKhoan} = useSelector(state => state.NguoiDungReducer)
    // console.log('taiKhoan',taiKhoan);

    return (
        <div className={styles.wrapper_template}>
            <div className={styles.wrapper_content}>
                <h1 className="my-5">Thông tin cá nhân</h1>
                <div className={cx(styles.avatar_box, "position-relative")}>
                    <img id="profileImg" src="https://banner2.cleanpng.com/20190702/tl/kisspng-computer-icons-portable-network-graphics-avatar-tr-clip-directory-professional-transparent-amp-png-5d1bfa95e508d4.2980489715621147099381.jpg" className={cx(styles.avatar_img, "img-sm rounded-circle border")} />
                    <label for="file-input">
                        <i className={cx(styles.inputAvatar_icon, "fas fa-camera")}></i>
                    </label>
                    <input id="file-input" name="avatar" className="d-none" type="file" />
                </div>
                <div className={styles.info}>
                    <ul className={styles.info_list}>
                        <li className={styles.info_item}>
                            <span className={styles.key}>Fullname: <strong className={styles.value}>Nguyễn Văn A</strong></span>
                        </li>
                        <li className={styles.info_item}>
                            <span className={styles.key}>Email: <strong className={styles.value}>abc@gmail.com</strong></span>
                        </li>
                        <li className={styles.info_item}>
                            <span className={styles.key}>Phone: <strong className={styles.value}>0123456789</strong></span>
                        </li>
                        <li className={styles.info_item}>
                            <span className={styles.key}>Address: <strong className={styles.value}>123 Hồ Chí Minh</strong></span>
                        </li>
                    </ul>
                </div>

            </div>
        </div>
    );
};
