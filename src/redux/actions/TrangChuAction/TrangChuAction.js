import axios from "axios";

export const layDanhSachPhimDangCongChieu = () => {
    return async dispatch => {
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
            console.log('error', error.response.data.msg);
        }
    }
}
export const layDanhSachPhimSapCongChieu = () => {
    return async dispatch => {
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
    }
}