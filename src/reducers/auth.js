import { setUser, removeUser } from '../utils'

import {
	LOGIN,
	LOGIN_SUCCESS,
    LOGIN_ERROR,
    LOGOUT
} from '../actions/auth'

import { merge } from 'lodash'

export default (
	state = { 
        loading: false,
        err: null,
	}, 
	action
) => {	
	switch (action.type) {
        case LOGIN:
			return merge({}, {
                loading: true
            })
            
        case LOGIN_ERROR:
			return merge({}, {
				loading: false,
				err: action.err
            })

        case LOGIN_SUCCESS:
            setUser(action.user, action.token)
			return merge({}, state, {
				loading: false
            })

        case LOGOUT:
            removeUser()
            break;
            
		default:
			return state
	}
}