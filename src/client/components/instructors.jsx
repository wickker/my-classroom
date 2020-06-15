import React from "react";
import BodyInstructors from "./instructors/body-instructors";
import styles from "./all_styles.scss";

export default class Instructors extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col-sm">
          <div className={styles.h1}>INSTRUCTORS</div>
          <BodyInstructors />
        </div>
      </div>
    );
  }
}
