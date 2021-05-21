import { applyMiddleware, combineReducers, createStore } from 'redux'
import reduxThunk from 'redux-thunk'
import { NguoiDungReducer } from '../redux/reducers/NguoiDungReducer'



const rootReducer = combineReducers({
    // Reducer khai báo tại đây
    NguoiDungReducer,

})

const store = createStore(rootReducer, applyMiddleware(reduxThunk));
export default store;
