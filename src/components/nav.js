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
    return (
      <div>
        <div className='navbar-fixed'>
            <nav className='black'>
            <div className="nav-wrapper">
                <a href="#!" className="brand-logo">TXMon</a>
                <a href="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
                <ul className="right hide-on-med-and-down">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/users">Users</Link></li>
                <li><div>Logout</div></li>
                </ul>
            </div>
            </nav>
         </div>

        <ul className="sidenav sidenav-fixed" id="mobile-demo">
            <li><div className="user-view">
                <a href="#name"><span className="name">John Doe</span></a>
                <a href="#email"><span className="email">jdandturk@gmail.com</span></a>
            </div></li>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/users">Users</Link></li>
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