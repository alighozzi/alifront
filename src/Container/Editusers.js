import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import swal from "sweetalert";
import axios from "axios";

class Editusers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangeFirstname = this.onChangeFirstname.bind(this);
    this.onChangeLastname = this.onChangeLastname.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
  }
  componentDidMount() {
    const token = window.localStorage.getItem("token");
    axios
      .get(
        "http://localhost:5000/api/show/user/" + this.props.match.params.id,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      )
      .then((users) => {
        this.setState({
          firstname: users.data.firstname,
          lastname: users.data.lastname,
          email: users.data.email,
          password: "",
        });
      })
      .catch((error) => console.log("erreur :", error));
  }

  handleSubmit(event) {
    event.preventDefault();
    const admin = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      password: this.state.password,
    };
    const token = window.localStorage.getItem("token");
    axios
      .post(
        "http://localhost:5000/api/update/" + this.props.match.params.id,
        admin,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      )
      .then((res) => console.log(res.data))
      .catch((error) => console.log("erreur :", error));
    swal({
      title: "User updated successfuly",
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

  render() {
    return (
      <div className="formTop">
        <form className="form1" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <span className="label">firstname </span>
            <input
              type="firstname"
              className="limit"
              name="firstname"
              value={this.state.firstname}
              onChange={this.onChangeFirstname}
              required
            />
          </div>
          <div className="form-group">
            <span className="label">lastname </span>
            <input
              type="lastname"
              className="limit"
              name="lastname"
              value={this.state.lastname}
              onChange={this.onChangeLastname}
              required
            />
          </div>
          <div className="form-group">
            <span className="label">email </span>
            <input
              type="email"
              className="limit"
              name="email"
              value={this.state.email}
              onChange={this.onChangeEmail}
              required
            />
          </div>
          <div className="form-group">
            <span className="label">password </span>
            <input
              type="password"
              className="limit"
              name="password"
              value={this.state.password}
              onChange={this.onChangePassword}
            />
          </div>
          <div className="showallBouton">
            <button type="submit" className="Boutonshowall">
              <span className="showallboutontext">Update admin</span>
            </button>
          </div>
        </form>
      </div>
    );
  }
}
export default withRouter(Editusers);
