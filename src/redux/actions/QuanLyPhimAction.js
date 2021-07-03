/* eslint-disable no-unused-vars */
import axios from "axios";
import { history } from "../../App";
import { Notification } from "../../components/Notification";

export const themPhim = (thongTinPhim) => {
    return async dispatch => {
        try {
            const result = await axios({
                url: 'https://cinejunsv.herokuapp.com/api/v1/film/add',
                method: 'POST',
                data: thongTinPhim
            })
            dispatch(layDanhSachPhim())
            Notification('Thông báo',result.data.msg);
            history.push('/admin/danh-sach-phim')

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

export const layDanhSachPhimDangCongChieuAdmin = () => {
    return async dispatch => {
        try {
            const result = await axios({
                url: `https://cinejunsv.herokuapp.com/api/v1/film?status=DANG_CONG_CHIEU`,
                method: 'GET',
                // headers: {
                //     'Authorization': `Bearer ${localStorage.getItem(TOKEN)}`
                // }
            })
            dispatch({
                type: 'GET_LIST_FILM_DANG_CONG_CHIEU',
                listFilmDangCongChieu: result.data
            })
        } catch (error) {
            // alert(error.response.data.msg);
            console.log('error', error.response.data.msg);
        }
    }
}
export const layDanhSachPhimSapCongChieuAdmin = () => {
    return async dispatch => {
        try {
            const result = await axios({
                url: `https://cinejunsv.herokuapp.com/api/v1/film?status=SAP_CONG_CHIEU`,
                method: 'GET',
                // headers: {
                //     'Authorization': `Bearer ${localStorage.getItem(TOKEN)}`
                // }
            })
            dispatch({
                type: 'GET_LIST_FILM_SAP_CONG_CHIEU',
                listFilmSapCongChieu: result.data
            })
        } catch (error) {
            // alert(error.response.data.msg);
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
            Notification('Thông báo','Xóa thành công!');
            history.push('/admin/danh-sach-phim')
        } catch (error) {
            alert(error.response.data.msg);
            console.log('error', error.response.data.msg);
        }
    }
}

export const suaPhim = (thongTinPhim, id) => {
    return async dispatch => {
        try {
            const result = await axios({
                url: `https://cinejunsv.herokuapp.com/api/v1/film/${id}`,
                method: 'PUT',
                data: thongTinPhim
            })
            dispatch(layDanhSachPhim())
            Notification('Thông báo','Sửa thành công!');           
            history.push('/admin/danh-sach-phim')
        } catch (error) {
            alert(error.response.data.msg);
            console.log('error', error.response.data.msg);
        }
    }
}

