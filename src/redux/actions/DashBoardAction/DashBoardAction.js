import axios from "axios";

export const layThongTinThongKeTheoCumRap = (clusterId, dateStart_End) => {
    let dateStart = dateStart_End[0];
    let dateEnd = dateStart_End[1]
    let api =
        `https://cinejunsv.herokuapp.com/api/v1/statistic?clusterId=${clusterId}` +
        (dateStart ? `&dateStart=${dateStart}` : '') +
        (dateEnd ? `&dateEnd=${dateEnd}` : '');
    return async dispatch => {
        try {
            const result = await axios({
                url: api,
                method: 'GET',
                // headers: {
                //     'Authorization': `Bearer ${localStorage.getItem(TOKEN)}`
                // }
            })
            dispatch({
                type: 'GET_THONGKE_CUM_RAP',
                listThongKeCumRap: result.data
            })
        } catch (error) {
            alert(error.response.data.msg);
            console.log('error', error.response.data.msg);
        }
    }
}
export const layThongTinThongKeTheoPhim = (filmId, dateStart_End) => {
    let dateStart = dateStart_End[0];
    let dateEnd = dateStart_End[1]
    let api =
        `https://cinejunsv.herokuapp.com/api/v1/statistic?filmId=${filmId}` +
        (dateStart ? `&dateStart=${dateStart}` : '') +
        (dateEnd ? `&dateEnd=${dateEnd}` : '');
    return async dispatch => {
        try {
            const result = await axios({
                url: api,
                method: 'GET',
                // headers: {
                //     'Authorization': `Bearer ${localStorage.getItem(TOKEN)}`
                // }
            })
            dispatch({
                type: 'GET_THONGKE_PHIM',
                listThongKePhim: result.data
            })
        } catch (error) {
            alert(error.response.data.msg);
            console.log('error', error.response.data.msg);
        }
    }
}