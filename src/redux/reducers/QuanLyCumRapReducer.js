const initialState = {
    listCumRap: [],
    dataClusterEdit: {}
}

export default (state = initialState, action) => {
    switch (action.type) {

        case 'GET_LIST_CUM_RAP': {
            state.listCumRap = action.listCumRap;
            return { ...state }
        }
        case 'DATA_EDIT_CLUSTER': {
            state.dataClusterEdit = action.dataClusterEdit;
            return { ...state }
        }

        default:
            return { ...state }

    }
}
