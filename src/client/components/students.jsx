import React from "react";
import Body from "./students/body-student";
import styles from "./all_styles.scss";

export default class Students extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col-sm">
          <div className={styles.h1}>STUDENTS</div>
          <Body />
        </div>
      </div>
    );
  }
}
