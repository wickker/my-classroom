import React from "react";
import NewStudent from "./new-student";
import SearchStudents from "./search-students";
import ShowCard from "./show-card";
import styles from "./students.scss";
var classNames = require("classnames");
const cx = classNames.bind(styles);

export default class Body extends React.Component {
  constructor() {
    super();
    this.state = {
      classes: [],
      students: [],
      ogStudents: [],
      searchMsg: "",
      studentCard: "",
      isHidden: true,
    };
  }

  getClasses = () => {
    let url = "/classes";
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log("classes: ", data);
        this.setState({ classes: data.classes });
      });
  };

  getStudents = () => {
    let url = "/students/get";
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log("students: ", data);
        this.setState({ students: data, ogStudents: data });
      });
  };

  componentDidMount = () => {
    this.getClasses();
    this.getStudents();
  };

  search = (event) => {
    let str = event.target.value.toUpperCase();
    let students = this.state.students;
    let searched = [];
    students.forEach((element) => {
      if (element.name.toUpperCase().includes(str)) {
        searched.push(element);
      }
    });
    searched.length > 0
      ? this.setState({ students: searched, searchMsg: "" })
      : this.setState({
          students: this.state.ogStudents,
          searchMsg: "No search results found.",
        });
  };

  getStudent = (event) => {
    console.log(event.target.id);
    let studentId = parseInt(event.target.id);
    console.log(this.state.ogStudents);
    let obj = this.state.ogStudents.find((element) => {
      return element.id === studentId;
    });
    console.log("obj: ", obj);
    this.setState({ studentCard: obj, isHidden: false });
  };

  input = cx(styles.input, "form-control");

  render() {
    return (
      <div className="row">
        <div className="col-sm">
          <NewStudent classes={this.state.classes} />

          <div className="row">
            <div className="col-sm-4">
              Search
              <input className={this.input} onChange={this.search} />
              <div>{this.state.searchMsg}</div>
              <SearchStudents
                students={this.state.students}
                getStudent={this.getStudent}
              />
            </div>
            <div className="col-sm">
              <ShowCard
                student={this.state.studentCard}
                isHidden={this.state.isHidden}
                classesArr={this.state.classes}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
