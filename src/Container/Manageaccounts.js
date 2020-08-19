import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import swal from "sweetalert";
import trashicon from "../assets/images/trash.png";
import editicon from "../assets/images/edit.png";
const Admin = (props) => (
  <tr>
    <td>{props.admin.firstname}</td>
    <td>{props.admin.lastname}</td>
    <td>{props.admin.email}</td>
    <td>
      <Link to={"/home/Accounts/Manageaccounts/update/" + props.admin._id}>
        <img src={editicon} alt="logo" className="logouticon"></img>
      </Link>{" "}
      |
      <button
        className="boutonIcon"
        onClick={() => {
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
        <img src={trashicon} alt="logo" className="logouticon"></img>
      </button>
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
      <div className="showallWraper">
        <div className="showallTitle">
          <span>Admin Lists </span>
        </div>
        <div className="showallBouton">
          <button
            className="Boutonshowall"
            onClick={() => {
              this.props.history.push("/home/Accounts/Manageaccounts/add");
            }}
          >
            <span className="showallboutontext">
              + Create new Admin account{" "}
            </span>
          </button>
        </div>
        <div className="showallTab">
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
      </div>
    );
  }
}
export default withRouter(Manageaccounts);
