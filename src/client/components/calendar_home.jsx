import React from "react";
import Grid from "./calendar/body-calendar";
import styles from "./all_styles.scss";

export default class Calendar extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col-sm">
          <div className={styles.h1}>SCHEDULE</div>
          <Grid />
        </div>
      </div>
    );
  }
}
