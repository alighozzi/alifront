import React, { Component } from "react";
import "./login.css";
//import axios from 'axios'
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loginAdmin } from "../redux/actions/userActions";
// import { authenticated } from "../redux/reducers/userReducers";
import logo from "../assets/images/babaliste_logo.PNG";
// import { SET_AUTHENTICATED } from "../redux/types";
class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {},
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  componentDidMount() {
    console.log(this.props.authenticated);
    if (this.props.authenticated) {
      this.props.history.push("/home");
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const admin = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.loginAdmin(admin, this.props.history);
  }

  onChangeEmail(event) {
    this.setState({
      email: event.target.value,
    });
  }

  onChangePassword(event) {
    this.setState({
      password: event.target.value,
    });
  }
  render() {
    const { errors } = this.state;
    return (
      <div className="wrap">
        <div className="headerwraper">
          <h4> product sourcing management platform</h4>
          <div className="logoWraper">
            <img src={logo} className="image" alt="logo" />
          </div>
        </div>
        <div className="body">
          <form className="login" onSubmit={this.handleSubmit}>
            <h2>Please enter your login details to get started</h2>
            <div className="formContainer">
              <div className="form-group formStyle">
                <label for="email">Email </label>
                <input
                  id="email"
                  className="form-control"
                  type="email"
                  name="email"
                  placeholder="xyz@babaliste.com"
                  value={this.state.email}
                  onChange={this.onChangeEmail}
                  required
                />
              </div>

              <div className="form-group formStyle">
                <label for="password"> Password </label>
                <input
                  id="password"
                  className="form-control"
                  type="password"
                  name="password"
                  placeholder="azerty123"
                  value={this.state.password}
                  onChange={this.onChangePassword}
                  required
                />
              </div>
              <div className="form-text text-muted">{errors.data}</div>

              <div className="form-group">
                <button type="submit" className="button">
                  login
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
Login.propTypes = {
  errors: PropTypes.object.isRequired,
  loginAdmin: PropTypes.func.isRequired,
  authenticated: PropTypes.bool.isRequired,
};
const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
  errors: state.user.errors,
});
const mapActionsToProps = {
  loginAdmin,
};
export default withRouter(connect(mapStateToProps, mapActionsToProps)(Login));
