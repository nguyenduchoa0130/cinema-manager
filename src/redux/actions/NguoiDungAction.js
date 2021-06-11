/* eslint-disable no-unused-vars */
import axios from "axios";
import { history } from "../../App"
import { TOKEN, USERLOGIN } from "../../util/constants/settingSystem";

export const dangNhapAction = (userLogin) => {
    return async dispatch => {
        try {
            const result = await axios({
                url: 'https://cinejunsv.herokuapp.com/api/v1/auth/signin',
                method: 'POST',
                data: userLogin
            })
            dispatch({
                type: 'DANG_NHAP',
                taiKhoan: result.data.taiKhoan
            })
            // console.log('data',result.data);
            localStorage.setItem(TOKEN, result.data.accessToken);
            localStorage.setItem(USERLOGIN, JSON.stringify(result.data))
            alert('Đăng nhập thành công')
            history.push('/');

        } catch (error) {
            alert(error.response.data.msg);
            console.log('error', error.response.data.msg);
        }
    }
}

export const dangNhapCallBackFBAction = () => {
    return async dispatch => {
        try {
            const result = await axios({
                url: 'https://cinejunsv.herokuapp.com/api/v1/auth/signin-fb',
                method: 'GET',
                headers: { "Access-Control-Allow-Origin": "http://localhost:3000", 'Access-Control-Allow-Methods': 'GET', 'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token','Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                'Content-Type': 'text/html' }
            })
            console.log('result', result.data);
            localStorage.setItem(USERLOGIN, JSON.stringify(result.data))
            let { isComplete, isExists, user } = result.data;
            if (isComplete && isExists) {
                // localStorage.setItem(TOKEN, result.data.accessToken);
                history.push('/')
            } else {
                history.push('/thong-tin-ban-dau')
            }
        } catch (error) {
            // alert(error.response.data.msg);
            console.log('error', error);
        }
    }
}




export const dangXuatAction = () => {
    return async dispatch => {
        try {
            const result = await axios({
                url: 'https://cinejunsv.herokuapp.com/api/v1/auth/signout',
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem(TOKEN)}`
                }
            })
            alert('Đăng xuất thành công')
        } catch (error) {
            alert(error.response.data.msg)
            console.log('error', error.response.data.msg);
        }
    }
}

export const dangKyAction = (userRegister) => {
    return async dispatch => {
        try {
            const result = await axios({
                url: 'https://cinejunsv.herokuapp.com/api/v1/auth/signup',
                method: 'POST',
                data: userRegister
            })
            alert('Đăng kí thành công!');
            // localStorage.setItem(TOKEN, result.data.accessToken);
            localStorage.setItem(USERLOGIN, JSON.stringify(result.data))
            // console.log(result.data.userId);
            history.push('/kich-hoat');
        } catch (error) {
            alert(error.response.data.msg)
            console.log('error', error.response.data.msg);
        }
    }
}

export const kichHoatAction = (code, userId) => {
    return async dispatch => {
        try {
            const result = await axios({
                url: 'https://cinejunsv.herokuapp.com/api/v1/auth/active/' + userId,
                method: 'PUT',
                data: code
            })
            alert('Kích hoạt thành công!');
            localStorage.removeItem(USERLOGIN);
            localStorage.removeItem(TOKEN);
            history.push('/dang-nhap');
        } catch (error) {
            alert(error.response.data.msg)
            console.log('error', error.response.data.msg);
        }
    }
}

export const layThongTinNguoiDung = (id) => {
    return async dispatch => {
        try {
            const result = await axios({
                url: `https://cinejunsv.herokuapp.com/api/v1/user/${id}`,
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem(TOKEN)}`
                }
            })
            // console.log('result', result.data);
            dispatch({
                type: 'GET_THONG_TIN_USER',
                thongTinNguoiDung: result.data
            })
        } catch (error) {
            console.log('error', error.response.data.msg);
        }
    }
}

export const quenMatKhau = (email) => {
    return async dispatch => {
        try {
            let result = await axios({
                url: `https://cinejunsv.herokuapp.com/api/v1/auth/forget`,
                method: 'POST',
                data: email
            })

            localStorage.setItem(TOKEN, result.data.accessToken);
            localStorage.setItem(USERLOGIN, JSON.stringify(result.data))
            history.push('/xac-nhan-otp')
        } catch (error) {
            alert(error.response.data.msg)
            console.log('error', error.response.data.msg);
        }
    }
}

export const xacNhanOtp = (code, userId) => {
    return async dispatch => {
        try {
            const result = await axios({
                url: 'https://cinejunsv.herokuapp.com/api/v1/auth/active/' + userId,
                method: 'PUT',
                data: code
            })
            alert('Xác nhận OTP thành công!');
            history.push('/doi-mat-khau');
        } catch (error) {
            alert(error.response.data.msg)
            console.log('error', error.response.data.msg);
        }
    }
}

export const matKhauMoi = (new_password, userId) => {
    return async dispatch => {
        try {
            const result = await axios({
                url: 'https://cinejunsv.herokuapp.com/api/v1/auth/reset/' + userId,
                method: 'PUT',
                data: new_password,
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem(TOKEN)}`
                }
            })

            alert('Đổi mật khẩu thành công!');
            localStorage.removeItem(USERLOGIN);
            localStorage.removeItem(TOKEN);
            history.push('/dang-nhap');
        } catch (error) {
            alert(error.response.data.msg)
            console.log('error', error.response.data.msg);
        }
    }
}

