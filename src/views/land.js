import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class extends Component {
    render () {
        return (
            <div>
                <div className="skewed-bg">
                    <div className="content">
                        <h1 className="title white-text">Bullet</h1>
                        <p className="text">The cloud bank account management platform.</p>
                        <div className='container'>
                            <Link className="btn white teal-text text-darken-2 btn-block" to="/login">
                                Register or login to an existing company<i className="material-icons right">keyboard_arrow_right</i>
                            </Link>
                            <br/>
                            <Link className="btn white teal-text text-darken-2 btn-block" to="/company/register">
                                Create a new company<i className="material-icons right">keyboard_arrow_right</i>
                            </Link>
                        </div>
                    </div>
                </div>
                
                <footer className="footer center">
                    <p className='flow-text'>
                        A magic Bullet for accounts and transaction management.
                    </p>
                </footer>
            </div>
        )
    }
}