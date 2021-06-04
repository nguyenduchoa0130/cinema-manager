import axios from "axios";
import { history } from "../../App";

export const layCumRap = () => {
    return async dispatch => {
        try {
            const result = await axios({
                url: 'https://cinejunsv.herokuapp.com/api/v1/cluster',
                method: 'GET',
                // headers: {
                //     'Authorization': `Bearer ${localStorage.getItem(TOKEN)}`
                // }
            })
            dispatch({
                type: 'GET_LIST_CUM_RAP',
                listCumRap: result.data
            })
        } catch (error) {
            alert(error.response.data.msg);
            console.log('error', error.response.data.msg);
        }
    }
}

export const themCumRap = (thongTinCumRap) => {
    return async dispatch => {
        try {
            const result = await axios({
                url: 'https://cinejunsv.herokuapp.com/api/v1/cluster/add',
                method: 'POST',
                data: thongTinCumRap,
                // headers: {
                //     'Authorization': `Bearer ${localStorage.getItem(TOKEN)}`
                // }
            })
            alert(result.data.msg);
            dispatch(layCumRap())
            history.push('/admin/quan-ly-cum-rap')
        } catch (error) {
            alert(error.response.data.msg);
            console.log('error', error.response.data.msg);
        }
    }
}

export const xoaCumRap = (maCumRap) => {
    return async dispatch => {
        try {
            const result = await axios({
                url: `https://cinejunsv.herokuapp.com/api/v1/cluster/${maCumRap}`,
                method: 'DELETE',
                // headers: {
                //     'Authorization': `Bearer ${localStorage.getItem(TOKEN)}`
                // }
            })
            alert(result.data.msg);
            dispatch(layCumRap())
        } catch (error) {
            alert(error.response.data.msg);
            console.log('error', error.response.data.msg);
        }
    }
}

export const suaCumRap = (thongTinCumRap, maCumRap) => {
    return async dispatch => {
        try {
            const result = await axios({
                url: `https://cinejunsv.herokuapp.com/api/v1/cluster/${maCumRap}`,
                method: 'PUT',
                data: thongTinCumRap,
                // headers: {
                //     'Authorization': `Bearer ${localStorage.getItem(TOKEN)}`
                // }
            })
            alert(result.data.msg);
            dispatch(layCumRap())
            history.push('/admin/quan-ly-cum-rap')
        } catch (error) {
            alert(error.response.data.msg);
            console.log('error', error.response.data.msg);
        }
    }
}
