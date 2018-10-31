import {
	GET_WALLETS,
	GET_WALLETS_SUCCESS,
    GET_WALLETS_ERROR,
} from '../actions/wallets'

import { merge } from 'lodash'

export default (
	state = { 
        loading: false,
        err: null,
        wallets: [],
	}, 
	action
) => {	
	switch (action.type) {

        case GET_WALLETS:
			return merge({}, {
                loading: true
            })

        case GET_WALLETS_ERROR:
			return merge({}, state, {
				loading: false,
				err: action.err
            })

        case GET_WALLETS_SUCCESS:
			return merge({}, state, {
                loading: false,
                wallets: action.wallets
            })

		default:
			return state
	}
}