/* eslint-disable import/no-anonymous-default-export */
const initialState = {
    listCumRap: [],
    listCumRapTheoHeThong:[],
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
        case 'GET_CUM_RAP_THEO_HE_THONG': {
            state.listCumRapTheoHeThong = action.listCumRapTheoHeThong;
            return { ...state }
        }

        default:
            return { ...state }

    }
}
