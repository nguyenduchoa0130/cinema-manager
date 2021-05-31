const initialState = {
    listCategory: [],
    listFilm: []
}

export default (state = initialState, action) => {
    switch (action.type) {

        case 'GET_CATEGORY': {
            state.listCategory = action.category
            return { ...state }
        }
        case 'GET_FILM': {
            state.listFilm = action.listFilm
            return { ...state }
        }
        default:
            return { ...state }
    }
}
