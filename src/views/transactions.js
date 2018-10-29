import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { getTransactions } from '../actions/transactions'


class UsersComponent extends Component {
    state = {
        loading: false
    }

    componentDidMount() {
        var $ = window.$;
        $('.modal').modal();
        this.props.getTransactions()
    }

    render() {
        const { transactions, loading, err, } = this.props

        return (
            <div className='container'>
                <div className='row'>
                    <h2 className='left'>Transactions</h2>
                    <div className='right'>
                        <br/><br/>
                        <button data-target="modal1" className='btn modal-trigger'>New</button>
                    </div>
                </div>
                
                 <ul className="collection">
                    {
                        loading ?
                        <p>Loading...</p> :
                        transactions.length > 0 ?
                        transactions.map((tx, index) => (
                            <li key={index} className="collection-item avatar">
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}} className='circle blue'>
                                    <span style={{ fontSize: '20px'}} className='white-text'>{tx.type[0].toUpperCase()}</span>
                                </div>
                                <span className="title">{tx.type}</span>
                                <div className="secondary-content">
                                    <span className="title">{tx.amount}</span>
                                </div>
                            </li>
                        )) :
                        <p>No transactions yet</p>
                    }
                    
                </ul>


               
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { transactions, loading, err } = state.transactions
    return {
        transactions,
        loading,
        err
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getTransactions: bindActionCreators(getTransactions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersComponent)