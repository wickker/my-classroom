import React from "react";

export default class Logout extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col-sm">
          <p>Logout success!</p>
          <p>Click <a href="/">here</a> to return to home page.</p>
        </div>
      </div>
    );
  }
}
