import { combineReducers } from 'redux'
import { reducer as FormReducer } from 'redux-form'

import testReducer from '../../features/Testarea/testReducer';
import eventReducer from '../../features/event/eventReducer';

const rootReducer = combineReducers({
    test: testReducer,
    eventsReducer: eventReducer,
    form: FormReducer,
})

export default rootReducer
