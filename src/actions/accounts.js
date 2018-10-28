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

export const ADD_ACCOUNT = "ADD_ACCOUNT"
export const ADD_ACCOUNT_SUCCESS = "ADD_ACCOUNT_SUCCESS"
export const ADD_ACCOUNT_ERROR = "ADD_ACCOUNT_ERROR"

export const addAccount = (data) => (
    async dispatch => {
        try {
            dispatch({
                type: ADD_ACCOUNT
            })
            const response = await fetch('http://localhost:3000/api/accounts', {
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + localStorage.getItem('token')
                }),
                method: 'POST',
                body: JSON.stringify(data)
            })
            const json = await response.json()
            
            if (json.status === 'success') {
                dispatch({
                    type: ADD_ACCOUNT_SUCCESS,
                    account:json.data
                })
            } else {
                dispatch({
                    type: ADD_ACCOUNT_ERROR,
                    err: json.msg
                })
            }
        } catch (err) {
            dispatch({
                type: ADD_ACCOUNT_ERROR,
                err
            })
        }
    }
)