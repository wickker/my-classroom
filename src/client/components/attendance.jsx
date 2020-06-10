import React from "react";
import AttendanceGrid from "./attendance/attendance-grid";

export default class Attendance extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col-sm">
          <h1>ATTENDANCE</h1>
          <AttendanceGrid />
        </div>
      </div>
    );
  }
}
