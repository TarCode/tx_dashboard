import { combineReducers } from 'redux'

import auth from './auth'
import accounts from './accounts'
import users from './users'

export default combineReducers({
    auth,
    accounts,
    users
})