import { setUser, removeUser } from '../utils'

import {
	GET_USERS,
	GET_USERS_SUCCESS,
    GET_USERS_ERROR,
} from '../actions/users'

import { merge } from 'lodash'

export default (
	state = { 
        loading: false,
        err: null,
        users: [],
	}, 
	action
) => {	
	switch (action.type) {
        case GET_USERS:
			return merge({}, {
                loading: true
            })

     
            
        case GET_USERS_ERROR:
			return merge({}, state, {
				loadingAdd: false,
				err: action.err
            })

       
        case GET_USERS_SUCCESS:
			return merge({}, state, {
                loading: false,
                users: action.users
            })

      
		default:
			return state
	}
}