import { combineReducers } from 'redux'

import auth from './auth'
import accounts from './accounts'
import transactions from './transactions'
import users from './users'
import create from './create'

export default combineReducers({
    auth,
    accounts,
    users,
    transactions,
    create
})