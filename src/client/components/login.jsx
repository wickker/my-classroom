import React from "react";
import LoginBody from "./authentication/login-body";

export default class Login extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col-sm">
          <h1>LOGIN</h1>
          <LoginBody callback={this.props.callback}/>
        </div>
      </div>
    );
  }
}
