import React from "react";
import LoginBody from "./authentication/login-body";
import styles from "./all_styles.scss";

export default class Login extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col-sm">
          <div className={styles.h1}>LOGIN</div>
          <LoginBody callback={this.props.callback} />
        </div>
      </div>
    );
  }
}
