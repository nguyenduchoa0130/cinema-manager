import { USERLOGIN } from "../../util/constants/settingSystem";

let taiKhoanNguoiDung = '';
if (localStorage.getItem(USERLOGIN)) {
    let userLogin = JSON.parse(localStorage.getItem(USERLOGIN));
    taiKhoanNguoiDung = userLogin.taiKhoan;
}

const stateDefault = {
    taiKhoan: taiKhoanNguoiDung,
    thongTinNguoiDung: {},
    userLogin:{}
}

export const NguoiDungReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case 'DANG_NHAP': {
            state.taiKhoan = action.userLogin;
            // console.log('taikhoan',state.taiKhoan);
            return { ...state };
        }
        case 'GET_THONG_TIN_USER': {
            state.thongTinNguoiDung = action.thongTinNguoiDung
            return { ...state }
        }
        case 'DANG_NHAP_FB': {
            state.userLogin = action.userLogin
            return { ...state }
        }
        default:
            return { ...state }
    }
}