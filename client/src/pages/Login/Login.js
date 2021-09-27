import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Login.css";

class Login extends Component {
  render() {
    return (
      <div className="sign-page">
        <div className="signup-form">
          <form>
            <h2 className="">Login with Your Account</h2>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                name="email"
                placeholder="Email"
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                name="password"
                placeholder="Password"
              />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary btn-lg">
                Login
              </button>
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
