import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import styles from "./all_styles.scss";
import Dashboard from "./dashboard";
import Calendar from "./calendar_home";
import Attendance from "./attendance";
import Students from "./students";
import Classes from "./classes";
import Instructors from "./instructors";
import Login from "./login";
import Logout from "./logout";

import clsx from "clsx";
import {
  makeStyles,
  useTheme,
  withTheme,
  withStyles,
} from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import icon from "../svg/dot-circle-regular.svg";

// styles
const drawerWidth = 240;

const useStyles = (theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
});

// main class starts here
class Navigation extends React.Component {
  constructor() {
    super();
    this.state = {
      open: false,
      isLogin: false,
      isLogout: true,
    };
  }

  componentDidMount = () => {
    let banana = localStorage.getItem("banana");
    if (!!banana) {
      this.setState({ isLogin: true, isLogout: false });
    } else {
      this.setState({ isLogin: false, isLogout: true });
    }
  };

  logout = () => {
    localStorage.removeItem("banana");
    this.setState({ isLogin: false, isLogout: true });
  };

  callback = (result) => {
    this.setState({ isLogin: result.isLogin, isLogout: result.isLogout });
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div className={this.props.classes.root}>
        <Router >
          <CssBaseline />
          <AppBar
            position="fixed"
            // controls color of navigation bar
            style={{ background: "#384873" }}
            className={clsx(this.props.classes.appBar, {
              [this.props.classes.appBarShift]: this.state.open,
            })}
          >
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={this.handleDrawerOpen}
                edge="start"
                className={clsx(
                  this.props.classes.menuButton,
                  this.state.open && this.props.classes.hide
                )}
              >
                <MenuIcon />
              </IconButton>
              <div className="row">
                <div className="col-sm-7">
                  <Typography variant="button" noWrap>
                    <span className={styles.nav_title}>My Classroom</span>
                  </Typography>
                </div>
                <div className="col-sm"></div>
              </div>
            </Toolbar>
          </AppBar>
          <Drawer
            className={this.props.classes.drawer}
            variant="persistent"
            anchor="left"
            open={this.state.open}
            classes={{
              paper: this.props.classes.drawerPaper,
            }}
          >
            <div className={this.props.classes.drawerHeader}>
              <IconButton onClick={this.handleDrawerClose}>
                {this.props.theme.direction === "ltr" ? (
                  <ChevronLeftIcon />
                ) : (
                  <ChevronRightIcon />
                )}
              </IconButton>
            </div>
            <Divider />
            <List>
              <Link
                to="/dashboard"
                style={{ textDecoration: "none", color: "black" }}
              >
                <ListItem button hidden={this.state.isLogout}>
                  <ListItemIcon>
                    <img className={styles.nav_icons} src={icon} />
                  </ListItemIcon>
                  <ListItemText>
                    <span className={styles.nav_items}>Dashboard</span>
                  </ListItemText>
                </ListItem>
              </Link>
              <Link to="/" style={{ textDecoration: "none", color: "black" }}>
                <ListItem button>
                  <ListItemIcon>
                    <img className={styles.nav_icons} src={icon} />
                  </ListItemIcon>
                  <ListItemText>
                    <span className={styles.nav_items}>Home</span>
                  </ListItemText>
                </ListItem>
              </Link>
              <Link
                to="/attendance"
                style={{ textDecoration: "none", color: "black" }}
              >
                <ListItem button>
                  <ListItemIcon>
                    <img className={styles.nav_icons} src={icon} />
                  </ListItemIcon>
                  <ListItemText>
                    <span className={styles.nav_items}>Attendance</span>
                  </ListItemText>
                </ListItem>
              </Link>
              <Link
                to="/students"
                style={{ textDecoration: "none", color: "black" }}
              >
                <ListItem button>
                  <ListItemIcon>
                    <img className={styles.nav_icons} src={icon} />
                  </ListItemIcon>
                  <ListItemText>
                    <span className={styles.nav_items}>Students</span>
                  </ListItemText>
                </ListItem>
              </Link>
              <Link
                to="/instructors"
                style={{ textDecoration: "none", color: "black" }}
              >
                <ListItem button>
                  <ListItemIcon>
                    <img className={styles.nav_icons} src={icon} />
                  </ListItemIcon>
                  <ListItemText>
                    <span className={styles.nav_items}>Instructors</span>
                  </ListItemText>
                </ListItem>
              </Link>
              <Link
                to="/classes"
                style={{ textDecoration: "none", color: "black" }}
              >
                <ListItem button>
                  <ListItemIcon>
                    <img className={styles.nav_icons} src={icon} />
                  </ListItemIcon>
                  <ListItemText>
                    <span className={styles.nav_items}>Classes</span>
                  </ListItemText>
                </ListItem>
              </Link>
              <Link
                to="/login"
                style={{ textDecoration: "none", color: "black" }}
              >
                <ListItem button hidden={this.state.isLogin}>
                  <ListItemIcon>
                    <img className={styles.nav_icons} src={icon} />
                  </ListItemIcon>
                  <ListItemText>
                    <span className={styles.nav_items}>Login</span>
                  </ListItemText>
                </ListItem>
              </Link>
              <Link
                to="/logout"
                style={{ textDecoration: "none", color: "black" }}
              >
                <ListItem
                  button
                  hidden={this.state.isLogout}
                  onClick={this.logout}
                >
                  <ListItemIcon>
                    <img className={styles.nav_icons} src={icon} />
                  </ListItemIcon>
                  <ListItemText>
                    <span className={styles.nav_items}>Logout</span>
                  </ListItemText>
                </ListItem>
              </Link>
            </List>
            <Divider />
          </Drawer>
          <main
            className={clsx(this.props.classes.content, {
              [this.props.classes.contentShift]: this.state.open,
            })}
          >
            <div className={this.props.classes.drawerHeader} />
            {/* react router starts here */}
            <Switch>
              <Route path="/attendance">
                <Attendance />
              </Route>
              <Route path="/students">
                <Students />
              </Route>
              <Route path="/classes">
                <Classes />
              </Route>
              <Route path="/instructors">
                <Instructors />
              </Route>
              <Route path="/login">
                <Login callback={this.callback} />
              </Route>
              <Route path="/dashboard">
                <Dashboard />
              </Route>
              <Route path="/logout">
                <Logout />
              </Route>
              <Route path="/">
                <Calendar />
              </Route>
            </Switch>
          </main>
        </Router>
      </div>
    );
  }
}

export default withStyles(useStyles, { withTheme: true })(Navigation);
