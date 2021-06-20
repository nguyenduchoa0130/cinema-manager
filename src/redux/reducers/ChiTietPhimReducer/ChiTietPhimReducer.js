const initialState = {
    dataFilmDetail: {},
    listShowtimesOfFilm: [],

}

export default (state = initialState, action) => {
    switch (action.type) {
        case "GET_DETAIL_FILM": {
            state.dataFilmDetail = action.dataFilmDetail
            return { ...state }
        }
        case "GET_LIST_SHOWTIMES_OF_FILM": {
            state.listShowtimesOfFilm = action.listShowtimesOfFilm
            return { ...state }
        }
        default:
            return { ...state }
    }
}
