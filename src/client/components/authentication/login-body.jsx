import React from "react";
import TextField from "@material-ui/core/TextField";
var sha256 = require("js-sha256");
import { isEmpty } from "lodash";
import { withRouter } from "react-router-dom";
import styles from "../all_styles.scss";
import Button from "@material-ui/core/Button";
var classNames = require("classnames");
const cx = classNames.bind(styles);

class LoginBody extends React.Component {
  constructor() {
    super();
    this.state = {
      instructors: [],
      errorMsg: "",
      email: "",
      password: "",
      found: {},
    };
  }

  getInstructors = async () => {
    let url = "/instructors/get";
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ instructors: data });
  };

  componentDidMount = () => {
    this.getInstructors();
  };

  setEmail = (event) => {
    let email = event.target.value;
    let found = this.state.instructors.find(
      (element) => element.email === email
    );
    this.setState({ email, errorMsg: "" });
    // if email is found, set user details object
    if (!!found) {
      this.setState({ found });
    }
  };

  setPassword = (event) => {
    let password = sha256(event.target.value);
    this.setState({ password, errorMsg: "" });
  };

  // check for password and email match
  checkMatch = () => {
    let email = this.state.email;
    let password = this.state.password;
    let found = this.state.found;
    // if email and password match
    if (
      !isEmpty(found) &&
      found.email === email &&
      found.password === password
    ) {
      // prepare and set local storage item
      let banana = {};
      banana.id = found.id;
      banana.name = found.name;
      banana = JSON.stringify(banana);
      localStorage.setItem("banana", banana);
      // pass data back to navigation component to change options displayed
      let data = {
        isLogin: true,
        isLogout: false,
      };
      this.props.callback(data);
      // redirect to dashboard
      this.props.history.push("/dashboard");
    } else {
      this.setState({ errorMsg: "Invalid email or password, please try again." });
    }
  };

  input = cx(styles.input_field, "form-control");
  button = cx(styles.button, "mt-4");

  render() {
    return (
      <div className="row">
        <div className="col-sm-6">
          <div className={styles.error}>{this.state.errorMsg}</div>
          <div className={styles.form_label}>Email</div>
          <input className={this.input} onChange={this.setEmail} required />
          <div className={styles.form_label}>Password</div>
          <input className={this.input} onChange={this.setPassword} required type="password" />
          <button className={this.button} onClick={this.checkMatch}>
            Submit
          </button>
        </div>
      </div>
    );
  }
}

export default withRouter(LoginBody);
