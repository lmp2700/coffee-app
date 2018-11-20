import {combineReducers} from 'redux';
import authReducer from './authReducer';
import searchReducer from './searchReducer';
import roasterReducer from './roasterReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    search: searchReducer,
    roasters: roasterReducer
});

export default rootReducer;