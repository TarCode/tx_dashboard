import React, { Component } from 'react'

export default class extends Component {
    render () {
        return (
            <div className='container'>
                <div className="row">
                    <form className="col s12">
                        <div className="row">
                            <div className="input-field col s12">
                                <input id="email" type="email" className="validate"/>
                                <label htmlFor="email">Email</label>
                            </div>
                            <div className="input-field col s12">
                                <input id="company" type="text" className="validate"/>
                                <label htmlFor="company">Company</label>
                            </div>
                            <div className="input-field col s12">
                                <input id="password" type="password" className="validate"/>
                                <label htmlFor="password">Password</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <button className="btn btn-block waves-effect waves-light" type="submit" name="action">Submit
                                    <i className="material-icons right">send</i>
                                </button>
                            </div>
                            <div className="input-field col s12">
                                <a href='#'>Need an account?</a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}