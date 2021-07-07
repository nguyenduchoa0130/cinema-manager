import axios from "axios";
import { timeout } from "../../Constants/SetTimeOut";

export const layChiTietPhim = (maPhim) => {
    return async dispatch => {
        dispatch({
            type: 'DISPLAY_LOADING'
        })
        await timeout(1200);
        try {
            const result = await axios({
                url: `https://cinejunsv.herokuapp.com/api/v1/film/${maPhim}`,
                method: 'GET',
                // headers: {
                //     'Authorization': `Bearer ${localStorage.getItem(TOKEN)}`
                // }
            })
            dispatch({
                type: 'GET_DETAIL_FILM',
                dataFilmDetail: result.data.film
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

export const layLichChieu = (filmId) => {
    return async dispatch => {
        dispatch({
            type: 'DISPLAY_LOADING'
        })
        await timeout(1200);
        try {
            const result = await axios({
                url: `https://cinejunsv.herokuapp.com/api/v1/showtimes?filmId=${filmId}`,
                method: 'GET',
                // headers: {
                //     'Authorization': `Bearer ${localStorage.getItem(TOKEN)}`
                // }
            })
            dispatch({
                type: 'GET_LIST_SHOWTIMES_OF_FILM',
                listShowtimesOfFilm: result.data
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
