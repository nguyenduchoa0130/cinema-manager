import axios from "axios";

export const themPhim = (thongTinPhim) => {
    return async dispatch => {
        try {
            const result = await axios({
                url: 'https://cinejunsv.herokuapp.com/api/v1/film/add',
                method: 'POST',
                data: thongTinPhim
            })
            alert(result.data.msg)
        } catch (error) {
            alert(error.response.data.msg);
            console.log('error', error.response.data.msg);
        }
    }
}

export const layTheLoaiPhim = () => {
    return async dispatch => {
        try {
            const result = await axios({
                url: 'https://cinejunsv.herokuapp.com/api/v1/cate',
                method: 'GET',
            })
            dispatch(
                {
                    type: "GET_CATEGORY",
                    category: result.data
                }
            )
        } catch (error) {
            // alert(error.response.data.msg);
            console.log('error', error.response.data.msg);
        }
    }
}

export const layDanhSachPhim = () => {
    return async dispatch => {
        try {
            const result = await axios({
                url: 'https://cinejunsv.herokuapp.com/api/v1/film',
                method: 'GET',
            })
            dispatch(
                {
                    type: "GET_FILM",
                    listFilm: result.data
                }
            )
        } catch (error) {
            console.clear();
            alert(error.response.data.msg);
            console.log('error', error.response.data.msg);
        }
    }
}

export const xoaPhim = (id) => {
    return async dispatch => {
        try {
            const result = await axios({
                url: `https://cinejunsv.herokuapp.com/api/v1/film/${id}`,
                method: 'DELETE',
            })
            dispatch(layDanhSachPhim())
            alert('Xóa thành công!')
        } catch (error) {
            alert(error.response.data.msg);
            console.log('error', error.response.data.msg);
        }
    }
}

export const suaPhim = (thongTinPhim,id) => {
    return async dispatch => {
        try {
            const result = await axios({
                url: `https://cinejunsv.herokuapp.com/api/v1/film/${id}`,
                method: 'PUT',
                data: thongTinPhim
            })
            dispatch(layDanhSachPhim())
            alert('Sửa thành công!')
        } catch (error) {
            alert(error.response.data.msg);
            console.log('error', error.response.data.msg);
        }
    }
}

