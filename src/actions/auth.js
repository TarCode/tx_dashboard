export const LOGIN = "LOGIN"
export const LOGIN_SUCCESS = "LOGIN_SUCCESS"
export const LOGIN_ERROR = "LOGIN_ERROR"

export const login = (data) => (
    async dispatch => {
        try {
            const response = await fetch('http://localhost:3000/api/auth/login', {
                headers: new Headers({
                    'Content-Type': 'application/json'
                }),
                method: 'POST',
                body: JSON.stringify(data)
            })
            const json = await response.json()
            
            dispatch({
                type: LOGIN_SUCCESS,
                user: {
                    email: json.user.email,
                    company: json.user.company
                },
                token: json.user.token
            })
        } catch (err) {
            dispatch({
                type: LOGIN_ERROR,
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