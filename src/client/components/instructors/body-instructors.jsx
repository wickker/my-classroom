import React from "react";
import NewInstructor from "./new-instructor";
// import SearchStudents from "./search-students";
// import ShowCard from "./show-card";
import styles from "./instructors.scss";
var classNames = require("classnames");
const cx = classNames.bind(styles);

export default class BodyInstructors extends React.Component {
  constructor() {
    super();
    this.state = {
      classes: [],
      sessions: [],
      // ogStudents: [],
      // searchMsg: "",
      // studentCard: "",
      // isHidden: true,
    };
  }

  getClasses = async () => {
    let url = "/classes/get";
    let response = await fetch(url);
    let data = await response.json();
    console.log("classes: ", data.classes);
    return data.classes;
  };

  getSessions = async () => {
    let url = "/sessions/get";
    let response = await fetch(url);
    let data = await response.json();
    console.log("sessions: ", data);
    return data;
  };

  componentWillMount = async () => {
    this.state.loading = true;
    let classes = await this.getClasses();
    let sessions = await this.getSessions();
    this.setState({
      loading: false,
      classes,
      sessions,
    });
  };

  search = (event) => {
    // let str = event.target.value.toUpperCase();
    // let students = this.state.students;
    // let searched = [];
    // students.forEach((element) => {
    //   if (element.name.toUpperCase().includes(str)) {
    //     searched.push(element);
    //   }
    // });
    // searched.length > 0
    //   ? this.setState({ students: searched, searchMsg: "" })
    //   : this.setState({
    //       students: this.state.ogStudents,
    //       searchMsg: "No search results found.",
    //     });
  };

  getStudent = (event) => {
    // console.log(event.target.id);
    // let studentId = parseInt(event.target.id);
    // console.log(this.state.ogStudents);
    // let obj = this.state.ogStudents.find((element) => {
    //   return element.id === studentId;
    // });
    // console.log("obj: ", obj);
    // this.setState({ studentCard: obj, isHidden: false });
  };

  input = cx(styles.input, "form-control");

  render() {
    return (
      <div className="row">
        <div className="col-sm">
          <NewInstructor classes={this.state.classes} sessions={this.state.sessions} />

          {/* <div className="row">
            <div className="col-sm-5">
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
          </div> */}
        </div>
      </div>
    );
  }
}
