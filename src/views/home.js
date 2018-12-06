import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { getWallets } from '../actions/wallets'
import { createWallet, createCredit, createDebit, clearData, updateWallet } from '../actions/create'

class CreateTransaction extends Component {
    state = {
        amount: ''
    }

    handleChange = e => {
        this.setState({ [e.target.id]: e.target.value })
    }

    handleSubmit = e => {
        e.preventDefault()
        const data = {
            amount: parseInt(this.state.amount, 10) * Math.pow(10, this.props.wallet.divisibility),
            divisibility: this.props.wallet.divisibility,
            currency_code: this.props.wallet.currency_code,
            user_wallet_id: this.props.wallet.user_wallet_id,
            wallet_id: this.props.wallet._id,
            user_id: this.props.wallet.user_id
        }

        if (this.props.tx_type === 'credit') {
            this.props.createCredit(data)
        } else {
            this.props.createDebit(data)
        }

        this.setState({ amount: '' })
    }

    closeAndGetData = e => {
        e.preventDefault()
        var $ = window.$;
        $('#modal2').modal('close');
        this.props.clearData();
        this.props.getWallets()
    }

    render() {
        const { amount } = this.state
        const { tx_type, transaction, err, wallet } = this.props        

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
                        <p>Create a new {tx_type} transaction for {wallet && wallet.name}</p>
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
        createCredit: bindActionCreators(createCredit, dispatch),
        createDebit: bindActionCreators(createDebit, dispatch)
    }
}
)(CreateTransaction)

class CreateWallet extends Component {
    state = {
        name: '',
        currency_code: '',
        divisibility: ''
    }

    handleChange = e => {
        this.setState({ [e.target.id]: e.target.value })
    }

    handleSubmit = e => {
        e.preventDefault()
        const data = this.state
        data['currency_code'] = this.state.currency_code.toUpperCase()
        this.props.createWallet(data)
        this.setState({ name: '', currency_code: '', divisibility: '' })
    }

    closeAndGetData = e => {
        e.preventDefault()
        var $ = window.$;
        $('#modal1').modal('close');
        this.props.clearData();
        this.props.getWallets()
    }

    render() {
        const { name, currency_code, divisibility } = this.state
        const { wallet, loading, err } = this.props

        

        return (
            <form onSubmit={this.handleSubmit} id="modal1" className="modal">
                {
                    wallet ?
                    <div className="modal-content">
                        <h4>Success</h4>
                        <p>wallet was added</p>
                    </div> :
                    <div className="modal-content">
                        <h4>Add wallet</h4>
                        <p>Add a new wallet</p>
                        <div className="input-field">
                            <input onChange={this.handleChange} value={name} id="name" type="text" className="validate"/>
                            <label htmlFor="name">Name</label>
                        </div>
                        <div className="input-field">
                            <input onChange={this.handleChange} value={currency_code} id="currency_code" type="text" className="validate"/>
                            <label htmlFor="currency_code">Currency code</label>
                        </div>
                        <div className="input-field">
                            <input onChange={this.handleChange} value={divisibility} id="divisibility" type="number" className="validate"/>
                            <label htmlFor="divisibility">Divisibility</label>
                        </div>
                        {
                            err ?
                            <span className='red-text'>{err}<br/><br/></span> :
                            null
                        }
                    </div>
                }
                
                {
                    wallet ?
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


const ConnectedCreateWallet = connect((state) => {
    const { wallet, loading, err } = state.create
    return {
        wallet,
        loading,
        err,
    }
}, 
(dispatch) => {
    return {
        createWallet: bindActionCreators(createWallet, dispatch)
    }
}
)(CreateWallet)

class SetDefaultWallet extends Component {
    handleSubmit = e => {
        e.preventDefault()
        this.props.updateWallet(this.props.selected_wallet._id, { default: true })
    }

    closeAndGetData = e => {
        e.preventDefault()
        var $ = window.$;
        $('#modal3').modal('close');
        this.props.clearData();
        this.props.getWallets()
    }

    render() {
        const { wallet, loading, err } = this.props

        return (
            <form onSubmit={this.handleSubmit} id="modal3" className="modal">
                {
                    wallet ?
                    <div className="modal-content">
                        <h4>Success</h4>
                        <p>Wallet was updated</p>
                    </div> :
                    <div className="modal-content">
                        <h4>Update wallet</h4>
                        <p>Are you sure you want to set this as the default wallet?</p>
                        {
                            err ?
                            <span className='red-text'>{err}<br/><br/></span> :
                            null
                        }
                    </div>
                }
                
                {
                    wallet ?
                    <div className="modal-footer">
                        <button onClick={this.closeAndGetData} className="waves-effect waves-green btn">Okay</button>
                    </div> :
                    <div className="modal-footer">
                        <a href="#!" className="modal-close waves-effect waves-green btn-flat">No</a>
                        {
                            this.props.selected_wallet &&
                            <button disabled={loading} className="waves-effect waves-green btn">Yes</button>
                        }
                    </div>
                }
            </form>
        )
    }
}


const ConnectedSetDefaultWallet = connect((state) => {
    const { wallet, loading, err } = state.create
    return {
        wallet,
        loading,
        err,
    }
}, 
(dispatch) => {
    return {
        updateWallet: bindActionCreators(updateWallet, dispatch)
    }
}
)(SetDefaultWallet)


class Home extends Component {
    state = {
        loading: false
    }

    componentDidMount() {
        var $ = window.$;
        $('.modal').modal();
        $('.collapsible').collapsible();
        this.props.getWallets()
    }

    render() {
        const { wallets, loading, getWallets, clearData } = this.props

        console.log("WALLETS", wallets);
        

        const { tx_type, selected_wallet } = this.state
        return (
            <div className='container'>

                <ConnectedCreateWallet
                    getWallets={getWallets}
                    clearData={clearData}
                />

                <ConnectedCreateTransaction
                    tx_type={tx_type}
                    wallet={selected_wallet}
                    getWallets={getWallets}
                    clearData={clearData}
                />

                <ConnectedSetDefaultWallet
                    selected_wallet={selected_wallet}
                    getWallets={getWallets}
                    clearData={clearData}
                />

                <div className='row'>
                    <h2 className='left'>Wallets</h2>
                    <div className='right'>
                        <br/><br/>
                        <button data-target="modal1" className='btn modal-trigger'>New</button>
                    </div>
                </div>
                <div className='row'>
                    <p className='flow-text'>The default wallet will be created for every new user that signs up to this company</p>
                </div>
                
                 <ul className="collection collapsible">
                    {
                        loading ?
                        <p>Loading...</p> :
                        wallets && wallets.company_wallets && wallets.company_wallets.length > 0 ?
                        wallets.company_wallets.map((wallet, index) => (
                            <li key={index}>
                                <div className='collapsible-header'>
                                    <p className="title">{wallet.name.toUpperCase()} ({wallets.user_wallets.filter(u => u.wallet_id === wallet._id).length}) {wallet.default ? 'Default' : null} </p>
                                </div>
                                <div className='collapsible-body'>
                                    <div className='container'>
                                       {
                                            !wallet.default ? 
                                            <button onClick={() => {
                                                this.setState({
                                                    selected_wallet: wallet
                                                })
                                                
                                                var $ = window.$;
                                                $('#modal3').modal('open');
                                            }} className="waves-effect btn btn-block">Set {wallet.name} as default</button> : 
                                            null
                                        }
                                        <br/>
                                       </div>
                                       {
                                           wallets.user_wallets.filter(u => u.wallet_id === wallet._id).map((u, index) => (
                                            <div key={index} className="collection-item avatar">
                                                <div className='right'>
                                                    <button onClick={() => {
                                                        this.setState({
                                                            tx_type: 'debit',
                                                            selected_wallet: { _id: wallet._id, user_wallet_id: u._id, divisibility: wallet.divisibility, currency_code: wallet.currency_code, user_id: u.user_id}
                                                        })

                                                        var $ = window.$;
                                                        $('#modal2').modal('open');
                                                    }} style={{ marginRight: '10px' }} className="waves-effect btn-flat">Debit</button>
                                                    <button onClick={() => {
                                                        this.setState({
                                                            tx_type: 'credit',
                                                            selected_wallet: { _id: wallet._id, user_wallet_id: u._id, divisibility: wallet.divisibility, currency_code: wallet.currency_code, user_id: u.user_id}
                                                        })
                                                        var $ = window.$;
                                                        $('#modal2').modal('open');
                                                    }} className="waves-effect btn-flat">Credit</button>
                                                </div>
                                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}} className='circle blue'>
                                                    <span style={{ fontSize: '20px'}} className='white-text'>{u.name[0].toUpperCase()}</span>
                                                </div>
                                                <span className="title">{u.user_id}</span>
                                                <p><b>Balance:</b> {u.balance} <br/>
                                                </p>
                                                
                                            </div>
                                           ))
                                       }
                                </div>
                            </li>
                        )) :
                        <p>No wallets yet</p>
                    }
                    
                </ul>


               
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { wallets, loading, err } = state.wallets
    return {
        wallets,
        loading,
        err
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getWallets: bindActionCreators(getWallets, dispatch),
        clearData: bindActionCreators(clearData, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)