const initialState = {
    listUser: []
}

export default (state = initialState, action) => {
    switch (action.type) {

        case 'GET_USER': {
            state.listUser = action.listUser
            return { ...state }
        }


        default:
            return { ...state }
    }
}
