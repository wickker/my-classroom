import React from "react";
import AttendanceGrid from "./attendance/attendance-grid";
import styles from "./all_styles.scss";

export default class Attendance extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col-sm">
          <div className={styles.h1}>ATTENDANCE</div>
          <AttendanceGrid />
        </div>
      </div>
    );
  }
}
