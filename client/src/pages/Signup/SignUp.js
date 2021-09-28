import React, { Component } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import "./SignUp.css";

class SignUp extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    showSubmitError: false,
    errorMsg: "",
  };

  onChangeUsername = (event) => {
    this.setState({ username: event.target.value });
  };

  onChangePassword = (event) => {
    this.setState({ password: event.target.value });
  };

  onChangeEmail = (event) => {
    this.setState({ email: event.target.value });
  };

  onSubmitSuccess = (jwtToken) => {
    const { history } = this.props;
    Cookies.set("jwt_token", jwtToken, {
      expires: 30,
      path: "/",
    });
    history.replace("/");
    this.setState({ email: "", password: "", username: "" });
  };

  onSubmitFailure = (errorMsg) => {
    this.setState({
      showSubmitError: true,
      errorMsg,
    });
  };

  onSubmitData = async (event) => {
    event.preventDefault();
    const { username, password, email } = this.state;
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    try {
      const { data } = await axios.post(
        "http://localhost:5003/api/auth/register",
        {
          username,
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
    const { username, password, email, showSubmitError, errorMsg } = this.state;
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
                    value={username}
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
                value={email}
                placeholder="Email"
                onChange={this.onChangeEmail}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={this.onChangePassword}
              />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary btn-lg">
                Sign Up
              </button>
              {showSubmitError && (
                <div className="err-div">
                  <p className="error-message">{errorMsg}</p>
                </div>
              )}
            </div>
          </form>
          <div className="hint-text">
            Already have an account? <Link to="/login">Login here</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUp;
