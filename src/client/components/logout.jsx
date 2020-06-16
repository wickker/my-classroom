import React from "react";
import styles from "./all_styles.scss"

export default class Logout extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col-sm">
          <div className={styles.subheader}>Logout success!</div>
          <div className={styles.stu_name}>Click <a href="/">here</a> to return to home page.</div>
        </div>
      </div>
    );
  }
}
