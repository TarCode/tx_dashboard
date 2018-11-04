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
            amount: this.state.amount,
            wallet: this.props.wallet.name
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
        name: ''
    }

    handleChange = e => {
        this.setState({ [e.target.id]: e.target.value })
    }

    handleSubmit = e => {
        e.preventDefault()
        const data = this.state
        this.props.createWallet(data)
        this.setState({ name: '' })
    }

    closeAndGetData = e => {
        e.preventDefault()
        var $ = window.$;
        $('#modal1').modal('close');
        this.props.clearData();
        this.props.getWallets()
    }

    render() {
        const { name } = this.state
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
        this.props.updateWallet(this.props.selected_wallet.wallet_id, { default: true })
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
        this.props.getWallets()
    }

    render() {
        const { wallets, loading, getWallets, clearData } = this.props

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
                
                 <ul className="collection">
                    {
                        loading ?
                        <p>Loading...</p> :
                        wallets.length > 0 ?
                        wallets.map((wallet, index) => (
                            <li key={index} className="collection-item avatar">
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}} className='circle blue'>
                                    <span style={{ fontSize: '20px'}} className='white-text'>{wallet.name[0].toUpperCase()}</span>
                                </div>
                                <span className="title">{wallet.name}</span>
                                <p>
                                    <b>Balance: </b>{wallet.balance}<br/>
                                    {wallet.default ? 'Default' : null}
                                </p>
                                <div className="secondary-content">
                                    {
                                        !wallet.default ? 
                                        <button onClick={() => {
                                            this.setState({
                                                selected_wallet: wallet
                                            })
                                            
                                            var $ = window.$;
                                            $('#modal3').modal('open');
                                        }} className="waves-effect btn-flat">Set default</button> : 
                                        null
                                    }
                                    <button onClick={() => {
                                        this.setState({
                                            tx_type: 'debit',
                                            selected_wallet: wallet
                                        })

                                        var $ = window.$;
                                        $('#modal2').modal('open');
                                    }} style={{ marginRight: '10px' }} className="waves-effect btn-flat">Debit</button>
                                    <button onClick={() => {
                                        this.setState({
                                            tx_type: 'credit',
                                            selected_wallet: wallet
                                        })
                                        var $ = window.$;
                                        $('#modal2').modal('open');
                                    }} className="waves-effect btn-flat">Credit</button>
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