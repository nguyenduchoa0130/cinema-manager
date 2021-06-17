const initialState = {
    dataFilmDetail: {},

}

export default (state = initialState, action) => {
    switch (action.type) {
        case "GET_DETAIL_FILM": {
            state.dataFilmDetail = action.dataFilmDetail
            return { ...state }
        }
        default:
            return { ...state }
    }
}
