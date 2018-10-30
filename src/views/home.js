import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { getAccounts } from '../actions/accounts'
import { createAccount, createCredit, clearData } from '../actions/create'

class CreateTransaction extends Component {
    state = {
        amount: ''
    }

    handleChange = e => {
        this.setState({ [e.target.id]: e.target.value })
    }

    handleSubmit = e => {
        e.preventDefault()
        if (this.props.tx_type === 'credit') {
            const data = {
                amount: this.state.amount,
                account: this.props.account.name
            }
            this.setState({ amount: '' })
            this.props.createCredit(data)
        }
    }

    closeAndGetData = e => {
        e.preventDefault()
        var $ = window.$;
        $('#modal2').modal('close');
        this.props.clearData();
        this.props.getAccounts()
    }

    render() {
        const { amount } = this.state
        const { tx_type, transaction, err, account } = this.props

        

        return (
            <form onSubmit={this.handleSubmit} id="modal2" className="modal">
                {
                    transaction ?
                    <div className="modal-content">
                        <h4>Success</h4>
                        <p>Transaction was successful</p>
                    </div> :
                    <div className="modal-content">
                        <h4>Create {tx_type}</h4>
                        <p>Create a new {tx_type} transaction for {account && account.name}</p>
                        <div className="input-field">
                            <input onChange={this.handleChange} value={amount} id="amount" type="number" className="validate"/>
                            <label htmlFor="amount">Amount</label>
                        </div>
                        {
                            err ?
                            <span className='red-text'>{err}<br/><br/></span> :
                            null
                        }
                    </div>
                }
                {
                    transaction ?
                    <div className="modal-footer">
                        <button onClick={this.closeAndGetData} className="waves-effect waves-green btn">Okay</button>
                    </div> :
                    <div className="modal-footer">
                        <a href="#!" className="modal-close waves-effect waves-green btn-flat">Cancel</a>
                        <button className="waves-effect waves-green btn">Create</button>
                    </div>
                }
            </form>
        )
    }
}

const ConnectedCreateTransaction = connect((state) => {
    const { transaction, loading, err } = state.create
    return {
        transaction,
        loading,
        err,
    }
}, 
(dispatch) => {
    return {
        createCredit: bindActionCreators(createCredit, dispatch)
    }
}
)(CreateTransaction)

class CreateAccount extends Component {
    state = {
        name: ''
    }

    handleChange = e => {
        this.setState({ [e.target.id]: e.target.value })
    }

    handleSubmit = e => {
        e.preventDefault()
        const data = this.state
        this.props.createAccount(data)
        this.setState({ name: '' })
    }

    closeAndGetData = e => {
        e.preventDefault()
        var $ = window.$;
        $('#modal1').modal('close');
        this.props.clearData();
        this.props.getAccounts()
    }

    render() {
        const { name } = this.state
        const { account, loading, err } = this.props

        

        return (
            <form onSubmit={this.handleSubmit} id="modal1" className="modal">
                {
                    account ?
                    <div className="modal-content">
                        <h4>Success</h4>
                        <p>Account was added</p>
                    </div> :
                    <div className="modal-content">
                        <h4>Add account</h4>
                        <p>Add a new account</p>
                        <div className="input-field">
                            <input onChange={this.handleChange} value={name} id="name" type="text" className="validate"/>
                            <label htmlFor="name">Name</label>
                        </div>
                        {
                            err ?
                            <span className='red-text'>{err}<br/><br/></span> :
                            null
                        }
                    </div>
                }
                
                {
                    account ?
                    <div className="modal-footer">
                        <button onClick={this.closeAndGetData} className="waves-effect waves-green btn">Okay</button>
                    </div> :
                    <div className="modal-footer">
                        <a href="#!" className="modal-close waves-effect waves-green btn-flat">Cancel</a>
                        <button disabled={loading} className="waves-effect waves-green btn">Add</button>
                    </div>
                }
            </form>
        )
    }
}





const ConnectedCreateAccount = connect((state) => {
    const { account, loading, err } = state.create
    return {
        account,
        loading,
        err,
    }
}, 
(dispatch) => {
    return {
        createAccount: bindActionCreators(createAccount, dispatch)
    }
}
)(CreateAccount)

class Home extends Component {
    state = {
        loading: false
    }

    componentDidMount() {
        var $ = window.$;
        $('.modal').modal();
        this.props.getAccounts()
    }

    render() {
        const { accounts, loading, getAccounts, clearData } = this.props

        const { tx_type, selected_account } = this.state
        return (
            <div className='container'>

                <ConnectedCreateAccount
                    getAccounts={getAccounts}
                    clearData={clearData}
                />

                <ConnectedCreateTransaction
                    tx_type={tx_type}
                    account={selected_account}
                    getAccounts={getAccounts}
                    clearData={clearData}
                />

                <div className='row'>
                    <h2 className='left'>Accounts</h2>
                    <div className='right'>
                        <br/><br/>
                        <button data-target="modal1" className='btn modal-trigger'>New</button>
                    </div>
                </div>
                
                 <ul className="collection">
                    {
                        loading ?
                        <p>Loading...</p> :
                        accounts.length > 0 ?
                        accounts.map((acc, index) => (
                            <li key={index} className="collection-item avatar">
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}} className='circle blue'>
                                    <span style={{ fontSize: '20px'}} className='white-text'>{acc.name[0].toUpperCase()}</span>
                                </div>
                                <span className="title">{acc.name}</span>
                                <p>
                                    <b>Balance: </b>{acc.balance}
                                </p>
                                <div className="secondary-content">
                                    <button onClick={() => {
                                        this.setState({
                                            tx_type: 'debit',
                                            selected_account: acc
                                        })
                                        var $ = window.$;
                                        $('#modal2').modal('open');
                                    }} style={{ marginRight: '10px' }} className="waves-effect btn-flat">Debit</button>
                                    <button onClick={() => {
                                        this.setState({
                                            tx_type: 'credit',
                                            selected_account: acc
                                        })
                                        var $ = window.$;
                                        $('#modal2').modal('open');
                                    }} className="waves-effect btn-flat">Credit</button>
                                </div>
                            </li>
                        )) :
                        <p>No accounts yet</p>
                    }
                    
                </ul>


               
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { accounts, loading, err } = state.accounts
    return {
        accounts,
        loading,
        err
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getAccounts: bindActionCreators(getAccounts, dispatch),
        clearData: bindActionCreators(clearData, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)