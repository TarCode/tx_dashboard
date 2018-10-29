import { setUser, removeUser } from '../utils'

import {
	GET_TRANSACTIONS,
	GET_TRANSACTIONS_SUCCESS,
    GET_TRANSACTIONS_ERROR,
} from '../actions/transactions'

import { merge } from 'lodash'

export default (
	state = { 
        loading: false,
        err: null,
        transactions: [],
	}, 
	action
) => {	
	switch (action.type) {
        case GET_TRANSACTIONS:
			return merge({}, {
                loading: true
            })

      
        case GET_TRANSACTIONS_ERROR:
			return merge({}, state, {
				loading: false,
				err: action.err
            })


        case GET_TRANSACTIONS_SUCCESS:
			return merge({}, state, {
                loading: false,
                transactions: action.transactions
            })

       
		default:
			return state
	}
}