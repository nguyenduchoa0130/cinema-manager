import axios from "axios";
import { TOKEN, USERLOGIN } from "../../util/constants/settingSystem";

export const layDanhSachNguoiDung = () => {
    return async dispatch => {
        try {
            const result = await axios({
                url: 'https://cinejunsv.herokuapp.com/api/v1/user',
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem(TOKEN)}`
                }
            })
            console.log('result', result.data);
            dispatch(
                {
                    type: "GET_LIST_USER",
                    listUser: result.data,
                }
            )
        } catch (error) {
            alert(error.response.data.msg);
            console.log('error', error.response.data.msg);
        }
    }
}

export const themNguoiDung = (thongTinNguoiDung) => {
    return async dispatch => {
        try {
            const result = await axios({
                url: 'https://cinejunsv.herokuapp.com/api/v1/user/add',
                method: 'POST',
                data: thongTinNguoiDung,
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem(TOKEN)}`
                }
            })
            alert(result.data.msg)
        } catch (error) {
            alert(error.response.data.msg);
            console.log('error', error.response.data.msg);
        }
    }
}

export const suaNguoiDung = (id) => {
    return async dispatch => {
        try {
            const result = await axios({
                url: `https://cinejunsv.herokuapp.com/api/v1/user/${id}`,
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem(TOKEN)}`
                }
            })
            alert(result.data.msg)
        } catch (error) {
            alert(error.response.data.msg);
            console.log('error', error.response.data.msg);
        }
    }
}

export const xoaNguoiDung = (id) => {
    return async dispatch => {
        try {
            const result = await axios({
                url: `https://cinejunsv.herokuapp.com/api/v1/user/${id}`,
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem(TOKEN)}`
                }
            })
            alert(result.data.msg)
        } catch (error) {
            alert(error.response.data.msg);
            console.log('error', error.response.data.msg);
        }
    }
}