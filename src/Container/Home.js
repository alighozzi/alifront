import React, { Component } from "react";
import logo from "../assets/images/babaliste_logo.PNG";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Sidebar from "./Sidebar";
import { logoutUser } from "../redux/actions/userActions";
import { connect } from "react-redux";
import Topperformance from "./Topperformance";
import Competitors from "./Competitors";
import Sourcingplanner from "./Sourcingplanner";
import Showall from "./Showall";
import Manageaccounts from "./Manageaccounts";
import Myaccount from "./Myaccount";
import Navbar from "./Navbar";
import Addadmin from "./Addadmin";
import Edituser from "./Editusers";
import Addsupplier from "./Addsupplier";
import Editsupplier from "./Editsupplier";
import Product from "./Product";
import Addproduct from "./Addproduct";
import Editproduct from "./Editproduct";
import { withRouter, Switch, Route } from "react-router-dom";

class Home extends Component {
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
    const { match } = this.props;
    // console.log("render home", match);
    return (
      <div className="generale">
        <Grid container spacing={2} className="gridContainer">
          <Grid item sm={2} xs={12} className="gridSidebar">
            <div className="gridLogo">
              <img src={logo} alt="logo" />
            </div>
            <Sidebar />
          </Grid>
          <Grid item sm={10} xs={12}>
            <Navbar></Navbar>
            <Switch>
              <Route
                path={`${match.path}/topperformance`}
                component={Topperformance}
              />

              <Route
                path={`${match.path}/Productsourcing/Competitors`}
                component={Competitors}
              />

              <Route
                path={`${match.path}/Productsourcing/Sourcingplanner`}
                component={Sourcingplanner}
              />
              <Route
                path={`${match.path}/Productsourcing/Showall/add`}
                component={Addsupplier}
              />
              <Route
                path={`${match.path}/Productsourcing/Showall/updatesupplier/:id`}
                component={Editsupplier}
              />
              <Route
                path={`${match.path}/Productsourcing/Showall/product/Add/:id`}
                component={Addproduct}
              />
              <Route
                path={`${match.path}/Productsourcing/Showall/product/Edit/:id`}
                component={Editproduct}
              />
              <Route
                path={`${match.path}/Productsourcing/Showall/product/:id`}
                component={Product}
              />

              <Route
                path={`${match.path}/Productsourcing/Showall`}
                component={Showall}
              />
              <Route
                exact
                path={`${match.path}/Accounts/Manageaccounts/add`}
                component={Addadmin}
              />
              <Route
                exact
                path={`${match.path}/Accounts/Manageaccounts/update/:id`}
                component={Edituser}
              />

              <Route
                path={`${match.path}/Accounts/Manageaccounts`}
                component={Manageaccounts}
              />
              <Route
                path={`${match.path}/Accounts/Myaccount`}
                component={Myaccount}
              />
            </Switch>
          </Grid>
        </Grid>
      </div>
    );
  }
}
Home.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  authenticated: PropTypes.bool.isRequired,
};
const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
});
const mapActionsToProps = {
  logoutUser,
};
export default withRouter(connect(mapStateToProps, mapActionsToProps)(Home));
