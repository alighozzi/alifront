import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import swal from "sweetalert";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

class Addadmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmpassword: "",
      AdminRegisterErrors: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangeFirstname = this.onChangeFirstname.bind(this);
    this.onChangeLastname = this.onChangeLastname.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const admin = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      password: this.state.password,
      confirmpassword: this.state.confirmpassword,
    };
    const token = window.localStorage.getItem("token");
    axios
      .post("http://localhost:5000/api/add/admin", admin, {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((res) => console.log(res.data))
      .catch((error) => console.log("erreur :", error));
    swal({
      title: "User created successfuly",
      icon: "success",
      button: "Ok",
    });
    this.props.history.push("/home/Accounts/Manageaccounts");
  }

  onChangeFirstname(e) {
    this.setState({
      firstname: e.target.value,
    });
  }
  onChangeLastname(e) {
    this.setState({
      lastname: e.target.value,
    });
  }
  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }
  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }
  onChangeConfirmPassword(e) {
    this.setState({
      confirmpassword: e.target.value,
    });
  }
  render() {
    return (
      <div className="formTop">
        <form className="form1" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <span className="label">Firstname :</span>
            <input
              className="limit"
              type="firstname"
              name="firstname"
              value={this.state.firstname}
              onChange={this.onChangeFirstname}
              required
            />
          </div>
          <div className="form-group">
            <span className="label">Lastname :</span>
            <input
              className="limit"
              type="lastname"
              name="lastname"
              value={this.state.lastname}
              onChange={this.onChangeLastname}
              required
            />
          </div>
          <div className="form-group">
            <span className="label">Email :</span>
            <input
              className="limit"
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.onChangeEmail}
              required
            />
          </div>
          <div className="form-group">
            <span className="label">Password :</span>
            <input
              className="limit"
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.onChangePassword}
              required
            />
          </div>
          <div className="form-group">
            <span className="label"> Confirm password :</span>
            <input
              className="limit"
              type="password"
              name="confirmpassword"
              value={this.state.confirmpassword}
              onChange={this.onChangeConfirmPassword}
              required
            />
          </div>
          <div className="showallBouton">
            <button type="submit" className="Boutonshowall">
              <span className="showallboutontext">create new admin</span>
            </button>
          </div>
        </form>
      </div>
    );
  }
}
export default withRouter(Addadmin);
