const initialState = {
    listRap: [],
    listRapTheoCumRap:[],
    dataRapEdit: {}
}

/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
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
        case 'GET_RAP_THEO_CUM_RAP': {
            state.listRapTheoCumRap = action.listRapTheoCumRap;
            return { ...state }
        }

        default:
            return { ...state }
    }
}
