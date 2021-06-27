
import React, { useEffect } from "react";
import styles from "./style.module.scss";
import cx from 'classnames';
import { useDispatch, useSelector } from "react-redux";
import { layThongTinNguoiDung } from "../../redux/actions/NguoiDungAction";
import { USERLOGIN } from "../../util/constants/settingSystem";
import Title from '../../components/Title'

export default function Profile() {
    let userId = 0;
    if (localStorage.getItem(USERLOGIN)) {
        let userLogin = JSON.parse(localStorage.getItem(USERLOGIN));
        userId = userLogin.userId;
    }
    // console.log('userId', userId);
    const { thongTinNguoiDung } = useSelector(state => state.NguoiDungReducer)
    // console.log('thongTinNguoiDung', thongTinNguoiDung);
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(layThongTinNguoiDung(userId))
    }, )


    return (
        <div className={styles.wrapper_template}>
            <div className={styles.wrapper_content}>
                <Title text={'Thông tin cá nhân'} className="my-5"/>
                <div className={cx(styles.avatar_box, "position-relative")}>
                    <img id="profileImg" src="https://banner2.cleanpng.com/20190702/tl/kisspng-computer-icons-portable-network-graphics-avatar-tr-clip-directory-professional-transparent-amp-png-5d1bfa95e508d4.2980489715621147099381.jpg" className={cx(styles.avatar_img, "img-sm rounded-circle border")} alt="avatar-img"  />
                    <label htmlFor="file-input">
                        <i className={cx(styles.inputAvatar_icon, "fas fa-camera")}></i>
                    </label>
                    <input id="file-input" name="avatar" className="d-none" type="file" />
                </div>
                <div className={styles.info}>
                    <ul className={styles.info_list}>
                        <li className={styles.info_item}>
                            <span className={styles.key}>Fullname: <strong className={styles.value}>{thongTinNguoiDung.user?.fullName}</strong></span>
                        </li>
                        <li className={styles.info_item}>
                            <span className={styles.key}>Email: <strong className={styles.value}>{thongTinNguoiDung.user?.email}</strong></span>
                        </li>
                        <li className={styles.info_item}>
                            <span className={styles.key}>Phone: <strong className={styles.value}>{thongTinNguoiDung.user?.phone}</strong></span>
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
