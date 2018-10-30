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