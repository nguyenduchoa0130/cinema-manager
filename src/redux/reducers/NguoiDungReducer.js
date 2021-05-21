import { USERLOGIN } from "../../util/constants/settingSystem";

let taiKhoanNguoiDung = '';
if (localStorage.getItem(USERLOGIN)) {
    let userLogin = JSON.parse(localStorage.getItem(USERLOGIN));
    taiKhoanNguoiDung = userLogin.taiKhoan;
}

const stateDefault = {
    taiKhoan: taiKhoanNguoiDung
}

export const NguoiDungReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case 'DANG_NHAP': {
            state.taiKhoan = action.userLogin;
            // console.log('taikhoan',state.taiKhoan);
            return { ...state };
        }
        default:
            return { ...state }
    }
}