import { setUser, removeUser } from '../utils'

import {
	GET_ACCOUNTS,
	GET_ACCOUNTS_SUCCESS,
    GET_ACCOUNTS_ERROR,
} from '../actions/accounts'

import { merge } from 'lodash'

export default (
	state = { 
        loading: false,
        err: null,
        accounts: []
	}, 
	action
) => {	
	switch (action.type) {
        case GET_ACCOUNTS:
			return merge({}, {
                loading: true
            })
            
        case GET_ACCOUNTS_ERROR:        
			return merge({}, {
				loading: false,
				err: action.err
            })

        case GET_ACCOUNTS_SUCCESS:
			return merge({}, state, {
                loading: false,
                accounts: action.accounts
            })

		default:
			return state
	}
}