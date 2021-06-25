const initialState = {
    detailBookingRoom: {}
}

/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default (state = initialState, action) => {
    switch (action.type) {

        case 'GET_DETAIL_BOOKINGROOM': {
            state.detailBookingRoom = action.detailBookingRoom
            return { ...state }
        }

        default:
            return state
    }
}
