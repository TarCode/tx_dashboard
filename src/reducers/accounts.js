import { setUser, removeUser } from '../utils'

import {
	GET_ACCOUNTS,
	GET_ACCOUNTS_SUCCESS,
    GET_ACCOUNTS_ERROR,

    ADD_ACCOUNT,
    ADD_ACCOUNT_SUCCESS,
    ADD_ACCOUNT_ERROR
} from '../actions/accounts'

import { merge } from 'lodash'

export default (
	state = { 
        loadingAdd: false,
        loading: false,
        err: null,
        errAdd: null,
        accounts: [],
        account: null
	}, 
	action
) => {	
	switch (action.type) {
        case GET_ACCOUNTS:
			return merge({}, {
                loading: true
            })

        case ADD_ACCOUNT:
			return merge({}, state, {
                loadingAdd: true
            })
            
        case GET_ACCOUNTS_ERROR:
			return merge({}, state, {
				loadingAdd: false,
				err: action.err
            })

        case ADD_ACCOUNT_ERROR:
			return merge({}, state, {
				loading: false,
				errAdd: action.err
            })

        case GET_ACCOUNTS_SUCCESS:
			return merge({}, state, {
                loading: false,
                accounts: action.accounts
            })

        case ADD_ACCOUNT_SUCCESS:
			return merge({}, state, {
                loadingAdd: false,
                account: action.account
            })

		default:
			return state
	}
}