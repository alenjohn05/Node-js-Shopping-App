import React, { Component } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

import "./Login.css";
class Login extends Component {
  state = {
    email: "",
    password: "",
    showSubmitError: false,
    errorMsg: "",
  };

  onChangeEmail = (event) => {
    this.setState({ email: event.target.value });
  };

  onChangePassword = (event) => {
    this.setState({ password: event.target.value });
  };

  onSubmitSuccess = (jwtToken) => {
    const { history } = this.props;

    Cookies.set("jwt_token", jwtToken, {
      expires: 30,
      path: "/",
    });
    history.replace("/");
  };

  onSubmitFailure = (errorMsg) => {
    this.setState({ showSubmitError: true, errorMsg });
  };

  submitForm = async (event) => {
    event.preventDefault();
    const { password, email } = this.state;
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    try {
      const { data } = await axios.post(
        `${process.env.BASE_URL}/api/auth/login`,
        {
          email,
          password,
        },
        config
      );
      this.onSubmitSuccess(data.jwt_token);
    } catch (error) {
      const { data } = error.response;
      this.onSubmitFailure(data.error);
    }
  };

  render() {
    const { password, email, showSubmitError, errorMsg } = this.state;
    return (
      <div className="sign-page">
        <div className="signup-form">
          <form onSubmit={this.submitForm}>
            <h2 className="">Login with Your Account</h2>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={this.onChangeEmail}
                placeholder="Email"
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={this.onChangePassword}
                placeholder="Password"
              />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary btn-lg">
                Login
              </button>
              {showSubmitError && (
                <div className="err-div">
                  <p className="error-message">{errorMsg}</p>
                </div>
              )}
            </div>
          </form>
          <div className="hint-text">
            Does not have an account? <Link to="/signup">SignUp here</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
