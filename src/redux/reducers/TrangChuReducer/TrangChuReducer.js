const initialState = {
    listFilmDangCongChieu: [],
    listFilmSapCongChieu: []
}

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
        default:
            return { ...state}
    }
}
