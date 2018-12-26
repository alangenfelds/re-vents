import { combineReducers } from 'redux'
import { reducer as FormReducer } from 'redux-form'

import testReducer from '../../features/Testarea/testReducer';
import eventReducer from '../../features/event/eventReducer';
import modalsReducer from '../../features/modals/modalReducer';
import authReducer from '../../features/auth/authReducer'

const rootReducer = combineReducers({
    test: testReducer,
    eventsReducer: eventReducer,
    form: FormReducer,
    modals: modalsReducer,
    auth: authReducer,
})

export default rootReducer
