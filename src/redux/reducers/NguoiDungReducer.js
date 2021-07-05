import { USERLOGIN } from "../../util/constants/settingSystem";

let taiKhoanNguoiDung = '';
let userid = '';
let tenNguoiDung = '';
if (localStorage.getItem(USERLOGIN)) {
    let userLogin = JSON.parse(localStorage.getItem(USERLOGIN));
    taiKhoanNguoiDung = userLogin.email;
    userid = userLogin.userId
    tenNguoiDung = userLogin.fullName
}

const stateDefault = {
    taiKhoan: taiKhoanNguoiDung,
    thongTinNguoiDung: {},
    userLogin: {},
    userId: userid,
    tenNguoiDung
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
        case 'DANG_NHAP_GG': {
            state.userLogin = action.userLogin
            return { ...state }
        }
        default:
            return { ...state }
    }
}