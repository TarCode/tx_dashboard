import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { login } from '../actions/auth'

class LoginComponent extends Component {
    state = {
        email: '',
        company: '',
        password: ''
    }

    handleChange = e => {
        this.setState({ [e.target.id]: e.target.value })
    }

    handleSubmit = e => {
        e.preventDefault()
        this.props.login(this.state)
    }

    render () {

        const { email, company, password } = this.state
        const { loading, err } = this.props
        console.log("ERROR", err);
        
        return (
            <div className='container'>
                <div className="row">
                    <form onSubmit={this.handleSubmit} className="col s12">
                        {/* <div className="row">
                            <div className="input-field col s6">
                            <input placeholder="Placeholder" id="first_name" type="text" className="validate"/>
                            <label for="first_name">First Name</label>
                            </div>
                            <div className="input-field col s6">
                            <input id="last_name" type="text" className="validate"/>
                            <label for="last_name">Last Name</label>
                            </div>
                        </div> */}
                        <div className="row">
                            <div className="input-field col s12">
                                <input onChange={this.handleChange} value={email} id="email" type="text" className="validate"/>
                                <label htmlFor="email">Email</label>
                            </div>
                            <div className="input-field col s12">
                                <input onChange={this.handleChange} value={company} id="company" type="text" className="validate"/>
                                <label htmlFor="company">Company</label>
                            </div>
                            <div className="input-field col s12">
                                <input onChange={this.handleChange} value={password} id="password" type="password" className="validate"/>
                                <label htmlFor="password">Password</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <button disabled={loading} className="btn btn-block waves-effect waves-light" type="submit" name="action">Submit
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

function mapStateToProps(state) {
    const { loading, err } = state.auth;
    return {
        loading,
        err
    }
}

function mapDispatchToProps(dispatch) {
    return {
        login: bindActionCreators(login, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent)