import React, { Component } from "react";
import { Link } from "react-router-dom";
import Cookies from 'js-cookie'
import "./SignUp.css";

class SignUp extends Component {
  state= {
    username: "",
    email: "",
    password: "",
    showSubmitError: false,
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeEmail = event => {
    this.setState({email: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    console.log(errorMsg)
    this.setState({showSubmitError: true, errorMsg})
  }


  onSubmitData=async(e)=>{
    e.preventDefault();
    const {username, password, email} = this.state;
    const userDetails = {username, password,email}
    const url = 'http://localhost:5003/api/auth/register'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails)
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }

  }

  render() {
    const {showSubmitError, errorMsg} = this.state
    return (
      <div className="sign-page">
        <div className="signup-form">
          <form onSubmit={this.onSubmitData}>
            <h2>Sign Up</h2>
            <p>Please fill in this form to create an account!</p>
            <div className="form-group">
              <div className="row">
                <div className="col-xs-6">
                  <input
                    type="text"
                    className="form-control"
                    name="username"
                    placeholder="Name"
                    onChange={this.onChangeUsername}
                  />
                </div>
              </div>
            </div>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                name="email"
                placeholder="Email"
                onChange={this.onChangeEmail}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                name="password"
                placeholder="Password"
                onChange={this.onChangePassword}
              />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary btn-lg">
                Sign Up
              </button>
              {showSubmitError && <p className="error-message">*{errorMsg}</p>}
            </div>
          </form>
          <div className="hint-text">
            Already have an account? <Link to='/login'>Login here</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUp;
