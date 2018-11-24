import { combineReducers } from 'redux'
import testReducer from '../../features/Testarea/testReducer';

const rootReducer = combineReducers({
    test: testReducer
})

export default rootReducer