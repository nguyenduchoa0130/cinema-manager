const initialState = {
    listUser: [],
    dataUserEdit: []
}
export default (state = initialState, action) => {
    switch (action.type) {

        case 'GET_LIST_USER': {
            state.listUser = action.listUser
            return { ...state }
        }
        case 'DATA_USER_EDIT': {
            state.dataUserEditUser = action.dataUser
            return { ...state }
        }

        default:
            return { ...state }
    }
}
