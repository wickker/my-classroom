import React from "react";
import NewStudent from "./new-student";

export default class Body extends React.Component {
  constructor() {
    super();
    this.state = {
      classes: [],
    };
  }

  getClasses = () => {
    let url = "/classes";
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log("data: ", data);
        this.setState({ classes: data.classes });
      });
  };

  componentDidMount = () => {
    this.getClasses();
  };

  render() {
    return (
      <div className="row">
        <div className="col-sm">
          <NewStudent classes={this.state.classes}/>

          <div className="row">
            <div className="col-sm">Search</div>
            <div className="col-sm">Card</div>
          </div>
        </div>
      </div>
    );
  }
}
