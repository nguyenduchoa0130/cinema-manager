import { applyMiddleware, combineReducers, createStore } from 'redux'
import reduxThunk from 'redux-thunk'
import { NguoiDungReducer } from '../redux/reducers/NguoiDungReducer'
import QuanLyPhimReducer from '../redux/reducers/QuanLyPhimReducer'
import QuanLyNguoiDungReducer from '../redux/reducers/QuanLyNguoiDungReducer'
import QuanLyHeThongRapReducer from '../redux/reducers/QuanLyHeThongRapReducer'
import QuanLyCumRapReducer from '../redux/reducers/QuanLyCumRapReducer'



const rootReducer = combineReducers({
    // Reducer khai báo tại đây
    NguoiDungReducer,
    QuanLyPhimReducer,
    QuanLyNguoiDungReducer,
    QuanLyHeThongRapReducer,
    QuanLyCumRapReducer
})

const store = createStore(rootReducer, applyMiddleware(reduxThunk));
export default store;
