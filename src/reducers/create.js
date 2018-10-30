import {
    CREATE_ACCOUNT,
    CREATE_ACCOUNT_SUCCESS,
    CREATE_ACCOUNT_ERROR,

    CREATE_CREDIT,
    CREATE_CREDIT_ERROR,
    CREATE_CREDIT_SUCCESS,

    CLEAR_DATA
} from '../actions/create'

import { merge } from 'lodash'

export default (
	state = { 
        loading: false,
        err: null,
	}, 
	action
) => {	
	switch (action.type) {

        case CREATE_ACCOUNT:
        case CREATE_CREDIT:
			return merge({}, state, {
                loading: true
            })
            
        case CREATE_ACCOUNT_ERROR:
        case CREATE_CREDIT_ERROR:
			return merge({}, state, {
				loading: false,
				err: action.err
            })

        case CREATE_ACCOUNT_SUCCESS:
			return merge({}, state, {
                loading: false,
                account: action.account
            })
        case CREATE_CREDIT_SUCCESS:
                return merge({}, state, {
                    loading: false,
                    transaction: action.transaction
                })
        
        case CLEAR_DATA:
            return merge({}, { 
                loading: false,
                err: null,
            })
		default:
			return state
	}
}