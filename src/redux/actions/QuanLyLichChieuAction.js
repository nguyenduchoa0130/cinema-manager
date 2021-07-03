import axios from "axios";
import { history } from "../../App";
import { Notification } from "../../components/Notification";

export const layLichChieu = (id) => {
    return async dispatch => {
        try {
            const result = await axios({
                url: `https://cinejunsv.herokuapp.com/api/v1/showtimes?clusterId=${id}`,
                method: 'GET',
                // headers: {
                //     'Authorization': `Bearer ${localStorage.getItem(TOKEN)}`
                // }
            })
            dispatch({
                type: 'GET__SHOWTIME',
                listShowTime: result.data
            })
        } catch (error) {
            alert(error.response.data.msg);
            console.log('error', error.response.data.msg);
        }
    }
}

export const layChiTietLichChieu = (clusterId,filmId) => {
    return async dispatch => {
        try {
            const result = await axios({
                url: `https://cinejunsv.herokuapp.com/api/v1/showtimes?clusterId=${clusterId}&filmId=${filmId}`,
                method: 'GET',
                // headers: {
                //     'Authorization': `Bearer ${localStorage.getItem(TOKEN)}`
                // }
            })
            dispatch({
                type: 'GET_DETAIL_SHOWTIME',
                listDetailShowTime: result.data
            })
        } catch (error) {
            alert(error.response.data.msg);
            console.log('error', error.response.data.msg);
        }
    }
}


export const themLichChieu = (thongTinLichChieu) => {
    return async dispatch => {
        try {
            const result = await axios({
                url: 'https://cinejunsv.herokuapp.com/api/v1/showtimes/add',
                method: 'POST',
                data: thongTinLichChieu
                // headers: {
                //     'Authorization': `Bearer ${localStorage.getItem(TOKEN)}`
                // }
            })
            
            // console.log('result', result.data);
            Notification('Thông báo',result.data.msg);
            history.push('/admin/quan-ly-suat-chieu')
        } catch (error) {
            alert(error.response.data.msg);
            console.log('error', error.response.data.msg);
        }
    }
}

export const suaLichChieu = (thongTinLichChieu, id) => {
    return async dispatch => {
        try {
            const result = await axios({
                url: `https://cinejunsv.herokuapp.com/api/v1/showtimes/${id}`,
                method: 'PUT',
                data: thongTinLichChieu
                // headers: {
                //     'Authorization': `Bearer ${localStorage.getItem(TOKEN)}`
                // }
            })
            Notification('Thông báo',result.data.msg);
        } catch (error) {
            alert(error.response.data.msg);
            console.log('error', error.response.data.msg);
        }
    }
}

export const xoaLichChieu = (id) => {
    return async dispatch => {
        try {
            const result = await axios({
                url: `https://cinejunsv.herokuapp.com/api/v1/showtimes/${id}`,
                method: 'DELETE',
                // headers: {
                //     'Authorization': `Bearer ${localStorage.getItem(TOKEN)}`
                // }
            })
            dispatch(layChiTietLichChieu(result.data.clusterId,result.data.filmId))
            dispatch(layLichChieu(result.data.clusterId))
            Notification('Thông báo',result.data.msg);
        } catch (error) {
            alert(error.response.data.msg);
            console.log('error', error.response.data.msg);
        }
    }
}