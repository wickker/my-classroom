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

  getClasses = async () => {
    let url = "/classes/get";
    let response = await fetch(url);
    let data = await response.json();
    console.log("classes: ", data);
    return data.classes;
  };

  getStudents = async () => {
    let url = "/students/get";
    let response = await fetch(url);
    let data = await response.json();
    console.log("students: ", data);
    return data;
  };

  componentWillMount = async () => {
    this.state.loading = true;
    let classes = await this.getClasses();
    let students = await this.getStudents();
    this.setState({
      loading: false,
      classes,
      students,
      ogStudents: students,
    });
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
              {this.state.loading ? null : (
                <SearchStudents
                  students={this.state.students}
                  getStudent={this.getStudent}
                />
              )}
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
