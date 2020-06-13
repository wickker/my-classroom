import React from "react";
import TextField from "@material-ui/core/TextField";
var sha256 = require("js-sha256");
import { isEmpty } from "lodash";
import { withRouter } from "react-router-dom";

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
    console.log("instructors: ", data);
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
      console.log(JSON.parse(localStorage.getItem("banana")));
      this.props.history.push("/dashboard");
    } else {
      this.setState({ errorMsg: "Wrong email or password, please try again." });
    }
  };

  render() {
    return (
      <div className="row">
        <div className="col-sm-6">
          <div>{this.state.errorMsg}</div>
          <TextField
            margin="dense"
            label="Email"
            fullWidth
            onChange={this.setEmail}
            required
          />
          <TextField
            margin="dense"
            label="Password"
            fullWidth
            onChange={this.setPassword}
            required
            type="password"
          />
          <button onClick={this.checkMatch}>Submit</button>
        </div>
      </div>
    );
  }
}

export default withRouter(LoginBody);
