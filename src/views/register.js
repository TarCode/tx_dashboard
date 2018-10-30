import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import { register } from '../actions/auth'

class RegisterComponent extends Component {
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
        this.props.register(this.state)
    }

    render () {

        const { email, company, password } = this.state
        const { loading, err } = this.props

        return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '90vh'}}>
                <div className='container'>
                    <h3>Register</h3>
                    <div className="row">
                        <form onSubmit={this.handleSubmit} className="col s12">
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
                            {
                                err ?
                                <span className='red-text'>{err}<br/><br/></span> :
                                null
                            }
                            <div className="row">
                                <div className="input-field col s12">
                                    <button disabled={loading} className="btn btn-block teal darken-2 waves-effect waves-light" type="submit" name="action">Submit
                                        <i className="material-icons right">send</i>
                                    </button>
                                </div>
                                <div className="input-field col s12">
                                    <Link className='right' to='/'>Back</Link>
                                    <Link to='/login'>Already have an account?</Link>
                                </div>
                            </div>
                        </form>
                    </div>
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
        register: bindActionCreators(register, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterComponent)