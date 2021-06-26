const initialState = {
    listThongKeCumRap:{},
    listThongKePhim:{}
}

export default (state = initialState, action) => {
    switch (action.type) {

        case 'GET_THONGKE_CUM_RAP': {
            state.listThongKeCumRap=action.listThongKeCumRap
            return { ...state }
        }
        case 'GET_THONGKE_PHIM': {
            state.listThongKePhim=action.listThongKePhim
            return { ...state }
        }
        default:
            return { ...state }
    }
}
