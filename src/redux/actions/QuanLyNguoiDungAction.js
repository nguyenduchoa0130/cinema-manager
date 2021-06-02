import axios from "axios";

export const layDanhSachNguoiDung = () => {
    return async dispatch => {
        try {
            const result = await axios({
                url: 'https://cinejunsv.herokuapp.com/api/v1/user/',
                method: 'GET',
            })
            dispatch(
                {
                    type: "GET_USER",
                    listUser: result.data
                }
            )
        } catch (error) {
            alert(error.response.data.msg);
            console.log('error', error.response.data.msg);
        }
    }
}