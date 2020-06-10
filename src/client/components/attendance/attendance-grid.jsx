import React from "react";
import ClassSelector from "./class-selector";

export default class AttendanceGrid extends React.Component {
  constructor() {
    super();
    this.state = {
      classes: [],
      attendance: [],
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

  findClassIdMatch = (event) => {
    console.log(event.target.value);
    let classId = event.target.value;

    const params = { classId: classId };
    console.log(params);
    let url = new URL("http://localhost:3000/sessions/attendance");
    url.search = new URLSearchParams(params).toString();
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log("data: ", data);
        // this.setState({ attendance: });
      });

  }

  componentDidMount = () => {
    this.getClasses();
  };

  render() {
    return (
      <div className="row">
        <div className="col-sm">

          <div className="row">
            <div className="col-sm-6">
              <ClassSelector classes={this.state.classes} findClassIdMatch={this.findClassIdMatch}/>
            </div>
          </div>

        </div>
      </div>
    );
  }
}
