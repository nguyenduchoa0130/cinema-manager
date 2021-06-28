import axios from "axios";
import Swal from "sweetalert2";
import { Notification } from '~/components/Notification';

export const layChiTietPhongVe = (id) => {
    return async dispatch => {
        try {
            const result = await axios({
                url: `https://cinejunsv.herokuapp.com/api/v1/showtimes?id=${id}`,
                method: 'GET',
                // headers: {
                //     'Authorization': `Bearer ${localStorage.getItem(TOKEN)}`
                // }
            })
            dispatch({
                type: 'GET_DETAIL_BOOKINGROOM',
                detailBookingRoom: result.data
            })
        } catch (error) {
            // alert(error.response.data.msg);
            console.log('error', error);
        }
    }
}
export const datVe = (thongTin) => {
    return async dispatch => {
        try {
            const result = await axios({
                url: `https://cinejunsv.herokuapp.com/api/v1/booking/add`,
                method: 'POST',
                data: thongTin
                // headers: {
                //     'Authorization': `Bearer ${localStorage.getItem(TOKEN)}`
                // }
            })

            if (result.status === 200) {
                Swal.fire(
                    {
                        title: 'Thông báo!',
                        text: result.data.msg,
                        icon: 'success'
                    }
                ).then(res => {
                    if (res.value) window.location.reload();
                })

            }
        } catch (error) {
            console.log('error', error.message);
        }
    }
}

