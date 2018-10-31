import {
    CREATE_WALLET,
    CREATE_WALLET_SUCCESS,
    CREATE_WALLET_ERROR,

    UPDATE_WALLET,
    UPDATE_WALLET_SUCCESS,
    UPDATE_WALLET_ERROR,

    CREATE_CREDIT,
    CREATE_CREDIT_ERROR,
    CREATE_CREDIT_SUCCESS,

    CREATE_DEBIT,
    CREATE_DEBIT_ERROR,
    CREATE_DEBIT_SUCCESS,

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

        case CREATE_WALLET:
        case CREATE_CREDIT:
        case CREATE_DEBIT:
        case UPDATE_WALLET:
			return merge({}, state, {
                loading: true
            })
            
        case CREATE_WALLET_ERROR:
        case CREATE_CREDIT_ERROR:
        case CREATE_DEBIT_ERROR:
        case UPDATE_WALLET_ERROR:
			return merge({}, state, {
				loading: false,
				err: action.err
            })

        case CREATE_WALLET_SUCCESS:
        case UPDATE_WALLET_SUCCESS:
			return merge({}, state, {
                loading: false,
                wallet: action.wallet
            })
        case CREATE_CREDIT_SUCCESS:
        case CREATE_DEBIT_SUCCESS:
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