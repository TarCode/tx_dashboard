import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { getAccounts } from '../actions/accounts'

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
        
        // this.props.login(this.state)
    }

    render() {
        const { name } = this.state

        return (
            <form onSubmit={this.handleSubmit} id="modal1" className="modal">
                <div className="modal-content">
                    <h4>Add account</h4>
                    <p>Add a new account</p>
                    <div className="input-field">
                        <input onChange={this.handleChange} value={name} id="name" type="text" className="validate"/>
                        <label htmlFor="name">Name</label>
                    </div>
                </div>
                <div className="modal-footer">
                    <a href="#!" className="modal-close waves-effect waves-green btn-flat">Cancel</a>
                    <button className="waves-effect waves-green btn">Add</button>
                </div>
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
        const { accounts, loading, err } = this.props
        return (
            <div className='container'>

                <AddAccount/>

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
    const { accounts, loading, err } = state.accounts
    return {
        accounts,
        loading,
        err
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getAccounts: bindActionCreators(getAccounts, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)