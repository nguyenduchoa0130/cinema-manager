const initialState = {
    listCategory: [],
    listFilm: [],
    dataFilmEdit:{}
}


/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
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
        case 'DATA_FILM_EDIT': {
            state.dataFilmEdit = action.dataFilm
            return { ...state }
        }
        default:
            return { ...state }
    }
}
