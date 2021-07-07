import axios from "axios";
import { timeout } from "../../Constants/SetTimeOut";

export const layLichSuDatVe = (userId) => {
    return async dispatch => {
        dispatch({
            type: 'DISPLAY_LOADING'
        })
        try {
            const result = await axios({
                url: `https://cinejunsv.herokuapp.com/api/v1/booking?userId=${userId}`,
                method: 'GET',
                // headers: {
                //     'Authorization': `Bearer ${localStorage.getItem(TOKEN)}`
                // }
            })
            dispatch({
                type: 'GET_HISTORY_BOOKING',
                historyBooking: result.data.bookings
            })
        } catch (error) {
            // alert(error.response.data.msg);
            console.log('error', error.response.data.msg);
        }
        dispatch({
            type: 'HIDE_LOADING'
        })
    }
}