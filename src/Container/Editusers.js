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
      <div>
        <h1>update admin details</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>firstname </label>
            <input
              type="firstname"
              className="form-control"
              name="firstname"
              value={this.state.firstname}
              onChange={this.onChangeFirstname}
              required
            />
          </div>
          <div className="form-group">
            <label>lastname </label>
            <input
              type="lastname"
              className="form-control"
              name="lastname"
              value={this.state.lastname}
              onChange={this.onChangeLastname}
              required
            />
          </div>
          <div className="form-group">
            <label>email </label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={this.state.email}
              onChange={this.onChangeEmail}
              required
            />
          </div>
          <div className="form-group">
            <label>password </label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={this.state.password}
              onChange={this.onChangePassword}
            />
          </div>
          <div className="form-group">
            <button
              type="submit"
              className="form-control"
              className="btn btn-primary"
            >
              Update admin{" "}
            </button>
          </div>
        </form>
      </div>
    );
  }
}
export default withRouter(Editusers);
