import React, { Component } from "react";
import PropTypes from "prop-types";
// import { logoutUser } from "../redux/actions/userActions";
// import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { logoutUser } from "../redux/actions/userActions";
import { connect } from "react-redux";
import logouticon from "../assets/images/logout.png";
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
      <div className="navigation">
        <span className="navtext">Back-office plateform for Babaliste</span>{" "}
        <div className="logout">
          <button type="submit" onClick={this.logout} className="buttonlogout">
            <img src={logouticon} alt="logo" className="logouticon"></img>
          </button>
        </div>
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
