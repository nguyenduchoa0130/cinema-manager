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
            history.push('/');

        } catch (error) {
            alert(error.response.msg);
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
            })
            alert('Đăng xuất thành công')
        } catch (error) {
            console.log('error', error.response.data);
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
            console.log('error', error.response.error);
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

            console.log('error', error.response.error);
        }
    }
}

