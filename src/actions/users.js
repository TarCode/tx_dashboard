export const GET_USERS = "GET_USERS"
export const GET_USERS_SUCCESS = "GET_USERS_SUCCESS"
export const GET_USERS_ERROR = "GET_USERS_ERROR"

export const getUsers = () => (
    async dispatch => {
        try {
            dispatch({
                type: GET_USERS
            })
            const response = await fetch('http://localhost:3000/api/admin/users', {
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + localStorage.getItem('token')
                })
            })
            const json = await response.json()
            
            if (json.status === 'success') {
                dispatch({
                    type: GET_USERS_SUCCESS,
                    users: json.data
                })
            } else {
                dispatch({
                    type: GET_USERS_ERROR,
                    err: json.msg
                })
            }
        } catch (err) {
            dispatch({
                type: GET_USERS_ERROR,
                err: "Error getting users"
            })
        }
    }
)
