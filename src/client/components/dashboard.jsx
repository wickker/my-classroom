import React from "react";
import DashboardBody from "./dashboard/dashboard-body";

export default class Dashboard extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col-sm">
          <h1>DASHBOARD</h1>
          <DashboardBody />
        </div>
      </div>
    );
  }
}
