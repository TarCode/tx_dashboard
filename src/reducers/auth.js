import { setUser, removeUser } from '../utils'

import {
	LOGIN,
	LOGIN_SUCCESS,
    LOGIN_ERROR,

    REGISTER,
    REGISTER_SUCCESS,
    REGISTER_ERROR,

    REGISTER_CLAN,
    REGISTER_CLAN_SUCCESS,
    REGISTER_CLAN_ERROR,

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
        case REGISTER:
        case REGISTER_CLAN:
			return merge({}, {
                loading: true
            })
            
        case LOGIN_ERROR:
        case REGISTER_ERROR:
        case REGISTER_CLAN_ERROR:      
			return merge({}, {
				loading: false,
				err: action.err
            })

        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
        case REGISTER_CLAN_SUCCESS:
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