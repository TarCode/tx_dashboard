export const CREATE_ACCOUNT = "CREATE_ACCOUNT"
export const CREATE_ACCOUNT_SUCCESS = "CREATE_ACCOUNT_SUCCESS"
export const CREATE_ACCOUNT_ERROR = "CREATE_ACCOUNT_ERROR"

export const createAccount = (data) => (
    async dispatch => {
        try {
            dispatch({
                type: CREATE_ACCOUNT
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
                    type: CREATE_ACCOUNT_SUCCESS,
                    account:json.data
                })
            } else {
                dispatch({
                    type: CREATE_ACCOUNT_ERROR,
                    err: json.msg
                })
            }
        } catch (err) {
            dispatch({
                type: CREATE_ACCOUNT_ERROR,
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

export const CLEAR_DATA = "CLEAR_DATA"

export const clearData = () => (
    dispatch => dispatch({ type: CLEAR_DATA })
)