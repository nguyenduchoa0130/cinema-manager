import axios from "axios";
import { timeout } from "../../Constants/SetTimeOut";

export const layDanhSachPhimDangCongChieu = () => {
    return async dispatch => {
        dispatch({
            type: 'DISPLAY_LOADING'
        })
        try {
            const result = await axios({
                url: `https://cinejunsv.herokuapp.com/api/v1/film?status=DANG_CONG_CHIEU`,
                method: 'GET',
                // headers: {
                //     'Authorization': `Bearer ${localStorage.getItem(TOKEN)}`
                // }
            })
            dispatch({
                type: 'GET_LIST_FILM_DANG_CONG_CHIEU',
                listFilmDangCongChieu: result.data
            })
        } catch (error) {
            // alert(error.response.data.msg);
            console.log('error', error);
        }
        dispatch({
            type: 'HIDE_LOADING'
        })
    }
}
export const layDanhSachPhimSapCongChieu = () => {
    return async dispatch => {
        dispatch({
            type: 'DISPLAY_LOADING'
        })
        try {
            const result = await axios({
                url: `https://cinejunsv.herokuapp.com/api/v1/film?status=SAP_CONG_CHIEU`,
                method: 'GET',
                // headers: {
                //     'Authorization': `Bearer ${localStorage.getItem(TOKEN)}`
                // }
            })
            dispatch({
                type: 'GET_LIST_FILM_SAP_CONG_CHIEU',
                listFilmSapCongChieu: result.data
            })
        } catch (error) {
            // alert(error.response.data.msg);
            // console.log('error', error.response.data.msg);
        }
        dispatch({
            type: 'HIDE_LOADING'
        })
    }
}
export const layDanhSachPhimHot= () => {
    return async dispatch => {
        dispatch({
            type: 'DISPLAY_LOADING'
        })
        try {
            const result = await axios({
                url: `https://cinejunsv.herokuapp.com/api/v1/film/hot`,
                method: 'GET',
                // headers: {
                //     'Authorization': `Bearer ${localStorage.getItem(TOKEN)}`
                // }
            })
            dispatch({
                type: 'GET_LIST_FILM_HOT',
                listFilmHot: result.data
            })
        } catch (error) {
            // alert(error.response.data.msg);
            // console.log('error', error.response.data.msg);
        }
        dispatch({
            type: 'HIDE_LOADING'
        })
    }
}
export const laydanhSachLichChieu = () => {
    return async dispatch => {
        dispatch({
            type: 'DISPLAY_LOADING'
        })
        try {
            const result = await axios({
                url: `https://cinejunsv.herokuapp.com/api/v1/showtimes`,
                method: 'GET',
                // headers: {
                //     'Authorization': `Bearer ${localStorage.getItem(TOKEN)}`
                // }
            })
            dispatch({
                type: 'GET_LIST_SHOWTIMES',
                listShowtimes: result.data
            })
        } catch (error) {
            // alert(error.response.data.msg);
            console.log('error', error.response.data.msg);
        }
        dispatch({
            type: 'HIDE_LOADING'
        })
    }
}
