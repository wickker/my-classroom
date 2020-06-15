import React from "react";
import DashboardBody from "./dashboard/dashboard-body";
import styles from "./all_styles.scss";

export default class Dashboard extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col-sm">
          <div className={styles.h1}>DASHBOARD</div>
          <DashboardBody />
        </div>
      </div>
    );
  }
}
