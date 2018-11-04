import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { getUsers } from '../actions/users'


class UsersComponent extends Component {
    state = {
        loading: false
    }

    componentDidMount() {
        var $ = window.$;
        $('.modal').modal();
        this.props.getUsers()
    }

    render() {
        const { users, loading, err, } = this.props

        return (
            <div className='container'>
                <div className='row'>
                    <h2 className='left'>Users</h2>
                    <div className='right'>
                        <br/><br/>
                        <button data-target="modal1" className='btn modal-trigger'>New</button>
                    </div>
                </div>
                
                 <ul className="collection">
                    {
                        loading ?
                        <p>Loading...</p> :
                        err ? 
                        <p>{err}</p> :
                        users && users.length > 0 ?
                        users.map((user, index) => (
                            <li key={index} className="collection-item avatar">
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}} className='circle blue'>
                                    <span style={{ fontSize: '20px'}} className='white-text'>{user.email[0].toUpperCase()}</span>
                                </div>
                                <span className="title">{user.email}</span>
                                <div className="secondary-content">
                                    <button className="waves-effect btn-flat">View</button>
                                  
                                </div>
                            </li>
                        )) :
                        <p>No users yet</p>
                    }
                    
                </ul>


               
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { users, loading, err } = state.users
    return {
        users,
        loading,
        err
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getUsers: bindActionCreators(getUsers, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersComponent)