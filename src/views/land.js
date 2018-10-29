import React, { Component } from 'react'

export default class extends Component {
    render () {
        return (
            <div className="welcome">
                <span id="splash-overlay" className="splash"></span>
                <span id="welcome" className="z-depth-4"></span>

                <header className="navbar-fixed">
                    <nav className="row blue darken-3">
                    <div className="col s12">
                        <ul className="right">
                        <li className="right">
                            <a href="" target="_blank" className="fa fa-facebook-square fa-2x waves-effect waves-light"><span className="icon-text"></span></a>
                        </li>
                        <li className="right">
                            <a href="" target="_blank" className="fa fa-github-square fa-2x waves-effect waves-light"><span className="icon-text"></span></a>
                        </li>
                        </ul>
                    </div>
                    </nav>
                </header>

                <main style={{ height: 'calc(100vh - 130px)'}} className="valign-wrapper">
                    <span className="container black-text text-lighten-1 ">

                    <p className="flow-text">Welcome to</p>
                    <h1 className="title black-text text-lighten-3">TXMon</h1>

                    <blockquote className="flow-text">A cloud bank account management system</blockquote>

                    <div className="center-align">
                        <a className="btn blue" href="" onClick={() => this.props.history.push('/login')}>Get started<i className="material-icons right">keyboard_arrow_right</i></a>
                    </div>

                    </span>
                </main>


                <footer className="page-footer blue darken-3">
                    <div className="footer-copyright blue darken-4">
                    <div className="container">
                        <span>&copy; 2018 Tarcode</span>
                    </div>
                    </div>
                </footer>
            </div>
        )
    }
}