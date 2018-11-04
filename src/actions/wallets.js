export const GET_WALLETS = "GET_WALLETS"
export const GET_WALLETS_SUCCESS = "GET_WALLETS_SUCCESS"
export const GET_WALLETS_ERROR = "GET_WALLETS_ERROR"

export const getWallets = () => (
    async dispatch => {
        try {
            dispatch({
                type: GET_WALLETS
            })
            const response = await fetch('http://localhost:3000/api/admin/wallets', {
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + localStorage.getItem('token')
                })
            })
            const json = await response.json()
            
            if (json.status === 'success') {
                dispatch({
                    type: GET_WALLETS_SUCCESS,
                    wallets:json.data
                })
            } else {
                dispatch({
                    type: GET_WALLETS_ERROR,
                    err: "Error getting wallets"
                })
            }
        } catch (err) {
            dispatch({
                type: GET_WALLETS_ERROR,
                err
            })
        }
    }
)