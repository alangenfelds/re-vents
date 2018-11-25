import { combineReducers } from 'redux'
import testReducer from '../../features/Testarea/testReducer';
import eventReducer from '../../features/event/eventReducer';

const rootReducer = combineReducers({
    test: testReducer,
    eventsReducer: eventReducer
})

export default rootReducer
