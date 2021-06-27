const initialState = {
    historyBooking: []
}

export default (state = initialState, action) => {
    switch (action.type) {

        case 'GET_HISTORY_BOOKING': {
            state.historyBooking = action.historyBooking
            return { ...state }

        }

        default:
            return { ...state }
    }
}
