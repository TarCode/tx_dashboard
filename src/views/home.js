import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { getAccounts, addAccount } from '../actions/accounts'

class AddAccount extends Component {
    state = {
        name: ''
    }

    handleChange = e => {
        this.setState({ [e.target.id]: e.target.value })
    }

    handleSubmit = e => {
        e.preventDefault()
        console.log("ACCOUNTS STATE", this.state);
        this.props.addAccount(this.state)
        
        // this.props.login(this.state)
    }

    closeAndGetData = e => {
        e.preventDefault()
        var $ = window.$;
        $('.modal').modal('close');
        this.props.getAccounts()
    }

    render() {
        const { name } = this.state
        const { account, loadingAdd, errAdd } = this.props

        

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
                    </div>
                }
                {
                    account ?
                    <div className="modal-footer">
                        <button onClick={this.closeAndGetData} className="waves-effect waves-green btn">Okay</button>
                    </div> :
                    <div className="modal-footer">
                        <a href="#!" className="modal-close waves-effect waves-green btn-flat">Cancel</a>
                        <button disabled={loadingAdd} className="waves-effect waves-green btn">Add</button>
                    </div>
                }
            </form>
        )
    }
}

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
        const { accounts, loading, err, account, loadingAdd, errAdd, addAccount, getAccounts } = this.props
        return (
            <div className='container'>

                <AddAccount 
                    account={account}
                    loading={loadingAdd}
                    err={errAdd}
                    addAccount={addAccount}
                    getAccounts={getAccounts}
                />

                <div className='row'>
                    <h2 className='left'>Accounts</h2>
                    <div className='right'>
                        <br/><br/>
                        <button data-target="modal1" className='btn modal-trigger'>New</button>
                    </div>
                </div>

                {
                    loading ?
                    <p>Loading...</p> :
                    accounts.length > 0 ?
                    accounts.map((acc, index) => (
                        <div key={index}>
                            <h3>{acc.name}</h3>
                        </div>
                    )) :
                    <p>No accounts yet</p>
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { accounts, account, loading, loadingAdd, err, errAdd } = state.accounts
    return {
        accounts,
        loading,
        err,

        account,
        loadingAdd,
        errAdd
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getAccounts: bindActionCreators(getAccounts, dispatch),
        addAccount: bindActionCreators(addAccount, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)