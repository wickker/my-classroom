import React from "react";
import BodyInstructors from "./instructors/body-instructors";

export default class Instructors extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col-sm">
          <h1>INSTRUCTORS</h1>
          <BodyInstructors />
        </div>
      </div>
    );
  }
}
