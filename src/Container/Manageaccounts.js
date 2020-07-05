import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import swal from "sweetalert";
const Admin = (props) => (
  <tr>
    <td>{props.admin.firstname}</td>
    <td>{props.admin.lastname}</td>
    <td>{props.admin.email}</td>
    <td>
      <Link to={"/home/Accounts/Manageaccounts/update/" + props.admin._id}>
        Edit
      </Link>{" "}
      |
      <a
        href="#"
        onClick={() => {
          //props.deleteAdmin(props.admin._id);
          swal({
            title: "Are you sure?",
            text: "this action is permanent",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          }).then((willDelete) => {
            if (willDelete) {
              props.deleteAdmin(props.admin._id);
              swal("User deleted!", {
                icon: "success",
              });
            } else {
              swal("User safe");
            }
          });
        }}
      >
        Delete
      </a>
    </td>
  </tr>
);

class Manageaccounts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      admins: [],
      errors: {},
    };
    this.deleteAdmin = this.deleteAdmin.bind(this);
  }
  componentDidMount() {
    const token = window.localStorage.getItem("token");

    axios
      .get("http://localhost:5000/api/show/all", {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((response) => {
        this.setState({ admins: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  deleteAdmin(id) {
    const token = window.localStorage.getItem("token");
    axios
      .delete("http://localhost:5000/api/delete/" + id, {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((res) => console.log(res.data));
    this.setState({
      admins: this.state.admins.filter((el) => el._id !== id),
    });
  }
  AdminList() {
    return this.state.admins.map((currentadmin) => {
      return (
        <Admin
          admin={currentadmin}
          deleteAdmin={this.deleteAdmin}
          key={currentadmin._id}
        />
      );
    });
  }
  render() {
    return (
      <div>
        <h1>Admins Lists </h1>
        <button
          className="bouton"
          onClick={() => {
            this.props.history.push("/home/Accounts/Manageaccounts/add");
          }}
        >
          + Create Admin Account
        </button>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Firstname</th>
              <th>Lastname</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{this.AdminList()}</tbody>
        </table>
      </div>
    );
  }
}
export default withRouter(Manageaccounts);
