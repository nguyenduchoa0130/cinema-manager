import axios from "axios"
import { history } from "../../App";

export const layHeThongRap = () => {
    return async dispatch => {
        try {
            const result = await axios({
                url: 'https://cinejunsv.herokuapp.com/api/v1/system',
                method: 'GET',
                // headers: {
                //     'Authorization': `Bearer ${localStorage.getItem(TOKEN)}`
                // }
            })
            dispatch({
                type: 'GET_LIST_CINEMA_SYSTEM',
                listHeThongRap: result.data
            })
        } catch (error) {
            alert(error.response.data.msg);
            console.log('error', error.response.data.msg);
        }
    }
}

export const themHeThongRap = (thongTinRap) => {
    return async dispatch => {
        try {
            const result = await axios({
                url: 'https://cinejunsv.herokuapp.com/api/v1/system/add',
                method: 'POST',
                data: thongTinRap,
                // headers: {
                //     'Authorization': `Bearer ${localStorage.getItem(TOKEN)}`
                // }
            })
            alert(result.data.msg);
            dispatch(layHeThongRap())
            history.push('/admin/quan-ly-he-thong-rap')
        } catch (error) {
            alert(error.response.data.msg);
            console.log('error', error.response.data.msg);
        }
    }
}

export const xoaHeThongRap = (maHeThongRap) => {
    return async dispatch => {
        try {
            const result = await axios({
                url: `https://cinejunsv.herokuapp.com/api/v1/system/${maHeThongRap}`,
                method: 'DELETE',
                // headers: {
                //     'Authorization': `Bearer ${localStorage.getItem(TOKEN)}`
                // }
            })
            alert(result.data.msg);
            dispatch(layHeThongRap())
        } catch (error) {
            alert(error.response.data.msg);
            console.log('error', error.response.data.msg);
        }
    }
}
export const suaHeThongRap = (thongTinRap, maHeThongRap) => {
    return async dispatch => {
        try {
            const result = await axios({
                url: `https://cinejunsv.herokuapp.com/api/v1/system/${maHeThongRap}`,
                method: 'PUT',
                data: thongTinRap,
                // headers: {
                //     'Authorization': `Bearer ${localStorage.getItem(TOKEN)}`
                // }
            })
            alert(result.data.msg);
            dispatch(layHeThongRap())
            history.push('/admin/quan-ly-he-thong-rap')
        } catch (error) {
            alert(error.response.data.msg);
            console.log('error', error.response.data.msg);
        }
    }
}