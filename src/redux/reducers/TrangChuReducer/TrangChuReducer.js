
const initialState = {
    listFilmDangCongChieu: [],
    listFilmSapCongChieu: [],
    listFilmHot: [],
    listShowtimes: []
}
/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default (state = initialState, action) => {
    switch (action.type) {
        case "GET_LIST_FILM_DANG_CONG_CHIEU": {
            state.listFilmDangCongChieu = action.listFilmDangCongChieu
            return { ...state }
        }
        case "GET_LIST_FILM_SAP_CONG_CHIEU": {
            state.listFilmSapCongChieu = action.listFilmSapCongChieu
            return { ...state }
        }
        case "GET_LIST_FILM_HOT": {
            state.listFilmHot = action.listFilmHot
            return { ...state }
        }
        case "GET_LIST_SHOWTIMES": {
            state.listShowtimes = action.listShowtimes
            return { ...state }
        }
        default:
            return { ...state }
    }
}
