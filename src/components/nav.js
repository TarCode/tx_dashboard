import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { logout } from '../actions/auth'

class Nav extends Component {

  componentDidMount() {
    var $ = window.$;
    $('.sidenav').sidenav();
  }

  render() {
    return (
      <div className="App">
         <nav>
          <div className="nav-wrapper">
            <a href="#!" className="brand-logo">TXMon</a>
            <a href="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
            <ul className="right hide-on-med-and-down">
              <li><Link to="/">Home</Link></li>
              <li><div>Logout</div></li>
            </ul>
          </div>
        </nav>

        <ul className="sidenav" id="mobile-demo">
            <li><Link to="/">Home</Link></li>
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