import { applyMiddleware, combineReducers, createStore } from 'redux'
import reduxThunk from 'redux-thunk'
import { NguoiDungReducer } from '../redux/reducers/NguoiDungReducer'
import QuanLyPhimReducer from '../redux/reducers/QuanLyPhimReducer'
import QuanLyNguoiDungReducer from '../redux/reducers/QuanLyNguoiDungReducer'
import QuanLyHeThongRapReducer from '../redux/reducers/QuanLyHeThongRapReducer'
import QuanLyCumRapReducer from '../redux/reducers/QuanLyCumRapReducer'
import QuanLyRapReducer from '../redux/reducers/QuanLyRapReducer'



const rootReducer = combineReducers({
    // Reducer khai báo tại đây
    NguoiDungReducer,
    QuanLyPhimReducer,
    QuanLyNguoiDungReducer,
    QuanLyHeThongRapReducer,
    QuanLyCumRapReducer,
    QuanLyRapReducer
})

const store = createStore(rootReducer, applyMiddleware(reduxThunk));
export default store;
