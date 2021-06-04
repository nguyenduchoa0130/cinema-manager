const initialState = {
    listUser: [],
    dataUserEdit: []
}
// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
    switch (action.type) {

        case 'GET_LIST_USER': {
            state.listUser = action.listUser
            return { ...state }
        }
        case 'DATA_USER_EDIT': {
            state.dataUserEdit = action.dataUser
            return { ...state }
        }

        default:
            return { ...state }
    }
}
