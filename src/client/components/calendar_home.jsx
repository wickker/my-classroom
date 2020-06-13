import React from "react";
import Grid from "./calendar/grid";

export default class Calendar extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col-sm">
          <h1>CALENDAR</h1>
          <Grid />
        </div>
      </div>
    );
  }
}
