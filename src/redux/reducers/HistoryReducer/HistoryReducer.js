const initialState = {
    historyBooking: []
}

// eslint-disable-next-line import/no-anonymous-default-export
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
