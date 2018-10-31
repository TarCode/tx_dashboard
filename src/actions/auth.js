export const LOGIN = "LOGIN"
export const LOGIN_SUCCESS = "LOGIN_SUCCESS"
export const LOGIN_ERROR = "LOGIN_ERROR"

export const login = (data) => (
    async dispatch => {
        try {
            dispatch({
                type: LOGIN
            })
            const response = await fetch('http://localhost:3000/api/auth/login', {
                headers: new Headers({
                    'Content-Type': 'application/json'
                }),
                method: 'POST',
                body: JSON.stringify(data)
            })
            const json = await response.json()
            
            if (json.user) {
                dispatch({
                    type: LOGIN_SUCCESS,
                    user: {
                        email: json.user.email,
                        clan: json.user.clan
                    },
                    token: json.user.token
                })
            } else {
                dispatch({
                    type: LOGIN_ERROR,
                    err: json.message
                })
            }
        } catch (err) {
            dispatch({
                type: LOGIN_ERROR,
                err
            })
        }
    }
)

export const REGISTER_CLAN = "REGISTER_CLAN"
export const REGISTER_CLAN_SUCCESS = "REGISTER_CLAN_SUCCESS"
export const REGISTER_CLAN_ERROR = "REGISTER_CLAN_ERROR"

export const registerClan = (data) => (
    async dispatch => {
        try {

            dispatch({
                type: REGISTER_CLAN
            })

            const response = await fetch('http://localhost:3000/api/auth/clan/register', {
                headers: new Headers({
                    'Content-Type': 'application/json'
                }),
                method: 'POST',
                body: JSON.stringify(data)
            })

            const json = await response.json()
            
            if (json.user) {
                dispatch({
                    type: REGISTER_CLAN_SUCCESS,
                    user: {
                        email: json.user.email,
                        clan: json.user.clan
                    },
                    token: json.user.token
                })
            } else {
                dispatch({
                    type: REGISTER_CLAN_ERROR,
                    err: json.message
                })
            }
        } catch (err) {
            dispatch({
                type: REGISTER_CLAN_ERROR,
                err
            })
        }
    }
)

export const REGISTER = "REGISTER"
export const REGISTER_SUCCESS = "REGISTER_SUCCESS"
export const REGISTER_ERROR = "REGISTER_ERROR"

export const register = (data) => (
    async dispatch => {
        try {

            dispatch({
                type: REGISTER
            })

            const response = await fetch('http://localhost:3000/api/auth/register', {
                headers: new Headers({
                    'Content-Type': 'application/json'
                }),
                method: 'POST',
                body: JSON.stringify(data)
            })

            const json = await response.json()
            
            if (json.user) {
                dispatch({
                    type: REGISTER_SUCCESS,
                    user: {
                        email: json.user.email,
                        clan: json.user.clan
                    },
                    token: json.user.token
                })
            } else {
                dispatch({
                    type: REGISTER_ERROR,
                    err: json.message
                })
            }
        } catch (err) {
            dispatch({
                type: REGISTER_ERROR,
                err
            })
        }
    }
)

export const LOGOUT = "LOGOUT"

export const logout = () => (
	dispatch => {
		dispatch({ type: LOGOUT })
	}
)