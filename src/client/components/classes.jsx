import React from "react";
import BodyClasses from "./classes/body-classes";
import styles from "./all_styles.scss";

export default class Classes extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col-sm">
          <div className={styles.h1}>CLASSES</div>
          <BodyClasses />
        </div>
      </div>
    );
  }
}
