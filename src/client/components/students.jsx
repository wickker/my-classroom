import React from "react";
import Body from "./students/body-student";

export default class Students extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col-sm">
          <h1>STUDENTS</h1>
          <Body />
        </div>
      </div>
    );
  }
}
