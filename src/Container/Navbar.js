import React, { Component } from "react";
import PropTypes from "prop-types";
// import { logoutUser } from "../redux/actions/userActions";
// import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { logoutUser } from "../redux/actions/userActions";
import { connect } from "react-redux";
//import { Link } from "react-router-dom";

class Navbar extends Component {
  constructor() {
    super();

    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    if (!this.props.authenticated) {
      this.props.history.push("/login");
    }
  }
  logout() {
    this.props.logoutUser();
  }

  render() {
    return (
      <div className="navbar">
        <form onSubmit={this.logout}>
          <h1 className="navtext">back-office plateform for babaliste</h1>{" "}
          <div className="logout">
            <button type="submit" className="glyphicon glyphicon-log-out">
              {" "}
              logout
            </button>
          </div>
        </form>
      </div>
    );
  }
}
Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  authenticated: PropTypes.bool.isRequired,
};
const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
});
const mapActionsToProps = {
  logoutUser,
};
export default withRouter(connect(mapStateToProps, mapActionsToProps)(Navbar));
