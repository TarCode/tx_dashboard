export const GET_ACCOUNTS = "GET_ACCOUNTS"
export const GET_ACCOUNTS_SUCCESS = "GET_ACCOUNTS_SUCCESS"
export const GET_ACCOUNTS_ERROR = "GET_ACCOUNTS_ERROR"

export const getAccounts = () => (
    async dispatch => {
        try {
            dispatch({
                type: GET_ACCOUNTS
            })
            const response = await fetch('http://localhost:3000/api/accounts', {
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + localStorage.getItem('token')
                })
            })
            const json = await response.json()
            
            if (json.status === 'success') {
                dispatch({
                    type: GET_ACCOUNTS_SUCCESS,
                    accounts:json.data
                })
            } else {
                dispatch({
                    type: GET_ACCOUNTS_ERROR,
                    err: "Error getting accounts"
                })
            }
        } catch (err) {
            dispatch({
                type: GET_ACCOUNTS_ERROR,
                err
            })
        }
    }
)