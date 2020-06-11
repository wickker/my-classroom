import React from "react";
import BodyClasses from "./classes/body-classes";

export default class Classes extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col-sm">
          <h1>CLASSES</h1>
          <BodyClasses />
        </div>
      </div>
    );
  }
}
