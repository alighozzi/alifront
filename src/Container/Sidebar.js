import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";

import ListItem from "@material-ui/core/ListItem";
import Collapse from "@material-ui/core/Collapse";
import ListItemText from "@material-ui/core/ListItemText";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import "./sidebar.css";
import { MemoryRouter } from "react-router";
import { withRouter, Link as RouterLink } from "react-router-dom";
// const breadcrumbNameMap = {
//   "/inbox": "Inbox",
//   "/inbox/important": "Important",
//   "/trash": "Trash",
//   "/spam": "Spam",
//   "/coucou": "coucou",
// };
const breadcrumbNameMap = {
  "/home": "Home",
  "/home/topperformance": "Top performance",
  "/home/Productsourcing": "Product sourcing",
  "/home/Productsourcing/Competitors": "Competitors",
  "/home/Productsourcing/Showall": "Show all",
  "/home/Accounts": "Accounts",

  "/home/Accounts/Manageaccounts": "Manage all accounts",
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    width: 300,
  },
  lists: {
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing(1),
  },
  nested: {
    paddingLeft: theme.spacing(4),
    color: "white",
    fontSize: 18,
    fontFamily: "Poppins",
  },
  ecrire: {
    color: "#4d4d4d",
    fontSize: 18,
    fontFamily: "Poppins",
  },
  flech: {
    color: "#4d4d4d",
  },
}));

const RouterBreadcrumbs = ({ history }) => {
  const classes = useStyles();
  const [openProduct, setOpenProduct] = React.useState(false);
  const [openAccount, setOpenAccount] = React.useState(false);

  const ListItemLink = (props) => {
    const { to, open, ...other } = props;
    const primary = breadcrumbNameMap[to];
    return (
      <li>
        <ListItem
          button
          onClick={() => {
            console.log("hello", to);
            history.push(`${to}`);
          }}
        >
          <ListItemText primary={primary} className={classes.ecrire} />
        </ListItem>
      </li>
    );
  };

  const ListItemCollapse = (props) => {
    const { to, open, ...other } = props;

    const primary = breadcrumbNameMap[to];
    return (
      <li>
        <ListItem button onClick={() => handleClickCollapse(to)}>
          <ListItemText primary={primary} className={classes.ecrire} />
          {open != null ? (
            open ? (
              <ExpandLess className={classes.flech} />
            ) : (
              <ExpandMore className={classes.flech} />
            )
          ) : null}
        </ListItem>
      </li>
    );
  };
  const handleClickCollapse = (to) => {
    if (to === "/home/Productsourcing") {
      setOpenProduct((openProduct) => !openProduct);
    } else {
      setOpenAccount((openAccount) => !openAccount);
    }
  };

  return (
    <MemoryRouter>
      <div className="sidebar">
        <nav aria-label="mailbox folders">
          <List>
            <ListItemLink to="/home" className={classes.ecrire} />
            <ListItemLink
              to="/home/topperformance"
              className={classes.ecrire}
            />
            <ListItemCollapse
              to="/home/Productsourcing"
              open={openProduct}
              className={classes.ecrire}
            />
            <Collapse
              component="li"
              in={openProduct}
              timeout="auto"
              unmountOnExit
            >
              <List disablePadding>
                <ListItemLink
                  to="/home/Productsourcing/Competitors"
                  className={classes.nested}
                />
                <ListItemLink
                  to="/home/Productsourcing/Showall"
                  className={classes.nested}
                />
              </List>
            </Collapse>
            <ListItemCollapse
              to="/home/Accounts"
              open={openAccount}
              className={classes.ecrire}
            />
            <Collapse
              component="li"
              in={openAccount}
              timeout="auto"
              unmountOnExit
            >
              <List disablePadding>
                <ListItemLink
                  to="/home/Accounts/Manageaccounts"
                  className={classes.nested}
                />
              </List>
            </Collapse>
          </List>
        </nav>
      </div>
    </MemoryRouter>
  );
};

export default withRouter(RouterBreadcrumbs);
