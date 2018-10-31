import { combineReducers } from 'redux'

import auth from './auth'
import wallets from './wallets'
import transactions from './transactions'
import users from './users'
import create from './create'

export default combineReducers({
    auth,
    wallets,
    users,
    transactions,
    create
})