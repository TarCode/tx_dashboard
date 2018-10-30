export const GET_TRANSACTIONS = "GET_TRANSACTIONS"
export const GET_TRANSACTIONS_SUCCESS = "GET_TRANSACTIONS_SUCCESS"
export const GET_TRANSACTIONS_ERROR = "GET_TRANSACTIONS_ERROR"

export const getTransactions = () => (
    async dispatch => {
        try {
            dispatch({
                type: GET_TRANSACTIONS
            })
            const response = await fetch('http://localhost:3000/api/transactions', {
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + localStorage.getItem('token')
                })
            })
            const json = await response.json()
            
            if (json.status === 'success') {
                dispatch({
                    type: GET_TRANSACTIONS_SUCCESS,
                    transactions:json.data
                })
            } else {
                dispatch({
                    type: GET_TRANSACTIONS_ERROR,
                    err: "Error getting transactions"
                })
            }
        } catch (err) {
            dispatch({
                type: GET_TRANSACTIONS_ERROR,
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

export const CREATE_CREDIT = "CREATE_CREDIT"
export const CREATE_CREDIT_SUCCESS = "CREATE_CREDIT_SUCCESS"
export const CREATE_CREDIT_ERROR = "CREATE_CREDIT_ERROR"

export const createCredit = (data) => (
    async dispatch => {
        try {
            dispatch({
                type: CREATE_CREDIT
            })
            const response = await fetch('http://localhost:3000/api/transactions/credit', {
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
                    type: CREATE_CREDIT_SUCCESS,
                    transaction:json.data
                })
            } else {
                dispatch({
                    type: CREATE_CREDIT_ERROR,
                    err: json.msg
                })
            }
        } catch (err) {
            dispatch({
                type: CREATE_CREDIT_ERROR,
                err
            })
        }
    }
)