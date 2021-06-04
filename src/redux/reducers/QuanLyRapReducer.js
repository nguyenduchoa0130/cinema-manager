const initialState = {
    listRap: [],
    dataRapEdit: {}
}

export default (state = initialState, action) => {
    switch (action.type) {

        case 'GET_LIST_RAP': {
            state.listRap = action.listRap;
            return { ...state }
        }
        case 'DATA_EDIT_RAP': {
            state.dataRapEdit = action.dataRapEdit;
            return { ...state }
        }

        default:
            return { ...state }
    }
}
