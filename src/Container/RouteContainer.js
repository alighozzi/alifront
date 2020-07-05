import React, { Component } from "react";
// import PropTypes from "prop-types";
// import { logoutUser } from "../redux/actions/userActions";
// import { connect } from "react-redux";
// import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Login from "./login";
import Home from "./Home";
import { Switch, Redirect, Route, withRouter } from "react-router-dom";
const AuthRoute = ({ component: Component, authUser, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        authUser ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};
class RouteContainer extends Component {
  render() {
    const { authenticated, location } = this.props;
    //console.log("render router container", location.pathname);
    return (
      <Switch>
        <Route exact path={"/login"} component={Login} />
        <AuthRoute path={"/home"} authUser={authenticated} component={Home} />

        {/* <Route
          path="/error"
          exact
          component={}/>}
        /> */}
        <Redirect to="/error" />
      </Switch>
    );
  }
}
const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
});
export default withRouter(connect(mapStateToProps, null)(RouteContainer));
