import axios from "axios";

export const themLichChieu = (thongTinLichChieu) => {
    return async dispatch => {
        try {
            const result = await axios({
                url: 'https://cinejunsv.herokuapp.com/api/v1/showtimes/add',
                method: 'POST',
                data: thongTinLichChieu
                // headers: {
                //     'Authorization': `Bearer ${localStorage.getItem(TOKEN)}`
                // }
            })
            alert(result.data.msg);
        } catch (error) {
            alert(error.response.data.msg);
            console.log('error', error.response.data.msg);
        }
    }
}