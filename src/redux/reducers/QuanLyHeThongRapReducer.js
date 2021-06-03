const initialState = {
    listHeThongRap: [],
    dataSystemEdit: {}
}

export default (state = initialState, action) => {
    switch (action.type) {

        case 'GET_LIST_CINEMA_SYSTEM': {
            state.listHeThongRap = action.listHeThongRap
            return { ...state }
        }
        case 'DATA_EDIT_SYSTEM': {
            state.dataSystemEdit = action.dataSystemEdit
            return { ...state }
        }


        default:
            return { ...state }
    }
}
