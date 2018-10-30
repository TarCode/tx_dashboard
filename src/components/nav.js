import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { logout } from '../actions/auth'

class Nav extends Component {

  componentDidMount() {
    var $ = window.$;
    $('.sidenav').sidenav({
        width: 300
    });
  }

  render() {
    const user = JSON.parse(localStorage.getItem('user'))

    return (
      <div>
        <div className='navbar-fixed'>
            <nav className='teal darken-2'>
            <div className="nav-wrapper">
                <a href="#!" className="brand-logo right">Bullet</a>
                <a href="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
            </div>
            </nav>
         </div>

        <ul className="sidenav sidenav-fixed" id="mobile-demo">
            <li><div className="user-view">
                <span className="center">{user.email}</span>
            </div></li>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/users">Users</Link></li>
            <li><Link to="/transactions">Transactions</Link></li>
            <li><a href='#' onClick={() => this.props.logout()}>Logout</a></li>
        </ul>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
    return {
        logout: bindActionCreators(logout, dispatch)
    }
}

export default connect(() => ({}), mapDispatchToProps)(Nav)