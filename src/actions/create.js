export const CREATE_WALLET = "CREATE_WALLET"
export const CREATE_WALLET_SUCCESS = "CREATE_WALLET_SUCCESS"
export const CREATE_WALLET_ERROR = "CREATE_WALLET_ERROR"

export const createWallet = (data) => (
    async dispatch => {
        try {
            dispatch({
                type: CREATE_WALLET
            })
            const response = await fetch('http://localhost:3000/api/wallets', {
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
                    type: CREATE_WALLET_SUCCESS,
                    wallet: json.data
                })
            } else {
                dispatch({
                    type: CREATE_WALLET_ERROR,
                    err: json.msg
                })
            }
        } catch (err) {
            dispatch({
                type: CREATE_WALLET_ERROR,
                err
            })
        }
    }
)

export const UPDATE_WALLET = "UPDATE_WALLET"
export const UPDATE_WALLET_SUCCESS = "UPDATE_WALLET_SUCCESS"
export const UPDATE_WALLET_ERROR = "UPDATE_WALLET_ERROR"

export const updateWallet = (id, data) => (
    async dispatch => {
        try {
            dispatch({
                type: UPDATE_WALLET
            })
            const response = await fetch('http://localhost:3000/api/wallets/' + id, {
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
                    type: UPDATE_WALLET_SUCCESS,
                    wallet: json.data
                })
            } else {
                dispatch({
                    type: UPDATE_WALLET_ERROR,
                    err: json.msg
                })
            }
        } catch (err) {
            dispatch({
                type: UPDATE_WALLET_ERROR,
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

export const CREATE_DEBIT = "CREATE_DEBIT"
export const CREATE_DEBIT_SUCCESS = "CREATE_DEBIT_SUCCESS"
export const CREATE_DEBIT_ERROR = "CREATE_DEBIT_ERROR"

export const createDebit = (data) => (
    async dispatch => {
        try {
            dispatch({
                type: CREATE_DEBIT
            })
            const response = await fetch('http://localhost:3000/api/transactions/debit', {
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
                    type: CREATE_DEBIT_SUCCESS,
                    transaction:json.data
                })
            } else {
                dispatch({
                    type: CREATE_DEBIT_ERROR,
                    err: json.msg
                })
            }
        } catch (err) {
            dispatch({
                type: CREATE_DEBIT_ERROR,
                err
            })
        }
    }
)


export const CLEAR_DATA = "CLEAR_DATA"

export const clearData = () => (
    dispatch => dispatch({ type: CLEAR_DATA })
)