const initialState = {
    listShowTime: [],
    listDetailShowTime: [],
    dataEditShowtime: {}
}

/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default (state = initialState, action) => {
    switch (action.type) {

        case 'GET__SHOWTIME': {
            state.listShowTime = action.listShowTime;
            return { ...state }
        }
        case 'GET_DETAIL_SHOWTIME': {
            state.listDetailShowTime = action.listDetailShowTime;
            return { ...state }
        }
        case 'DATA_EDIT_SHOWTIME': {
            state.dataEditShowtime = action.dataEditShowtime;
            return { ...state }
        }
        default:
            return { ...state }
    }
}
