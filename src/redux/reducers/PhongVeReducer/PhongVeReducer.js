const initialState = {
    detailBookingRoom: {}
}

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
