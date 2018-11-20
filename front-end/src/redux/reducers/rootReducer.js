import {combineReducers} from 'redux';
import authReducer from './authReducer';
import searchReducer from './searchReducer';
import roasterReducer from './roasterReducer';
import roastReducer from './roastReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    search: searchReducer,
    roasters: roasterReducer,
    roasts: roastReducer
});

export default rootReducer;