import { applyMiddleware, combineReducers, createStore } from 'redux'
import reduxThunk from 'redux-thunk'
import { NguoiDungReducer } from '../redux/reducers/NguoiDungReducer'
import QuanLyPhimReducer from '../redux/reducers/QuanLyPhimReducer'
import QuanLyNguoiDungReducer from '../redux/reducers/QuanLyNguoiDungReducer'



const rootReducer = combineReducers({
    // Reducer khai báo tại đây
    NguoiDungReducer,
    QuanLyPhimReducer,
    QuanLyNguoiDungReducer

})

const store = createStore(rootReducer, applyMiddleware(reduxThunk));
export default store;
