import React from "react";
import ClassSelector from "./class-selector";
import { get } from "lodash";
import styles from "./attendance.scss";
import { withRouter } from "react-router-dom";
var classNames = require("classnames");
const cx = classNames.bind(styles);
var moment = require("moment");
import MarkAttendance from "./mark-attendance-att";

export class AttendanceGrid extends React.Component {
  constructor() {
    super();
    this.state = {
      classes: [],
      attendance: [],
      attendanceArray: [],
      isHidden: true,
      classSelected: "",
      classObjSelected: {},
      isLogin: true,
      hide: false,
    };
  }

  // get classes data
  initClasses = async () => {
    let url = "/classes/get";
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ classes: data.classes });
  };

  // sort by name asc
  compareName = (a, b) => {
    const itemA = a.name.toUpperCase();
    const itemB = b.name.toUpperCase();

    let comparison = 0;
    if (itemA > itemB) {
      comparison = 1;
    } else if (itemA < itemB) {
      comparison = -1;
    }
    return comparison;
  };

  // sort by time asc
  compareTime = (a, b) => {
    return a.start_datetime - b.start_datetime;
  };

  // find class that matches id selected from dropdown list
  findClassIdMatch = (event) => {
    let classId = event.target.value;
    this.setState({ classSelected: classId });
    this.setClassObjSelected(classId);
    this.initSelectedClassForId(classId);
  };

  // save class object that matches id
  setClassObjSelected = (classId) => {
    let classes = this.state.classes;
    let obj = classes.find((element) => element.id === parseInt(classId, 10));
    this.setState({ classObjSelected: obj });
  };

  // get class object from end point
  initSelectedClassForId = async (classId) => {
    const params = { classId: classId };
    let url = new URL("http://localhost:3000/sessions/attendance");
    url.search = new URLSearchParams(params).toString();
    let response = await fetch(url);
    let data = await response.json();
    // sort students by name and sessions by time in class object
    let studentsByName = data.students.sort(this.compareName);
    data.students = studentsByName;
    let sessionsByTime = data.sessions.sort(this.compareTime);
    data.sessions = sessionsByTime;
    this.initAttendanceArray(data);
  };

  // generate attendance array grid
  initAttendanceArray = (data) => {
    let attendance = data;
    let array = [];
    for (let x = 0; x < attendance.students.length; x++) {
      array.push([]);
      for (let y = 0; y < attendance.sessions.length; y++) {
        let string =
          attendance.students[x].student_id +
          "-" +
          attendance.sessions[y].session_id;
        array[x].push(string);
      }
    }
    console.log("raw array:", array);
    // determine whether or not to hide attendance error message
    if (array.length === 0 || array[0].length === 0) {
      this.setState({ isHidden: false });
    } else {
      this.setState({ isHidden: true });
    }
    this.setState({ attendance, attendanceArray: array });
  };

  // get class id from url params
  getClassFromParams = (props) => {
    const searchQuery = get(props, "location.search") || "";
    const classId = searchQuery ? searchQuery.split("?classid=")[1] : "";
    return classId;
  };

  componentDidMount = async () => {
    // check for login
    let banana = localStorage.getItem("banana");
    console.log("BANANA: ", banana);
    if (!banana) {
      this.setState({ isLogin: false, hide: true });
    }
    const classId = this.getClassFromParams(this.props);
    await this.initClasses();
    this.setClassObjSelected(classId);
    await this.initSelectedClassForId(classId);
    this.setState({ classSelected: classId });
  };

  // styles
  box = cx(styles.box_row, "row", "mb-2", "mt-2");
  boxHead = cx(styles.box_head, "row", "mb-2", "mt-4");

  // render attendance html grid from raw array
  renderAttendanceGrid = () => {
    if (this.state.attendanceArray.length > 0) {
      let attendance = this.state.attendance;
      let array = this.state.attendanceArray;
      let studentId;
      let sessionId;
      let HTML = array.map((row, rowIndex) => {
        let count = 0;
        let box = row.map((col, colIndex) => {
          let res = col.split("-");
          studentId = parseInt(res[0]);
          sessionId = parseInt(res[1]);
          // find attendance object with matching session and student id
          let obj = attendance.attendance.find((element) => {
            return (
              element.session_id === sessionId &&
              element.student_id === studentId
            );
          });
          let text;
          obj.is_present ? (text = 1) : (text = 0);
          count = count + text;
          let textStyle;
          obj.is_late === 1 ? (textStyle = "text-danger") : (textStyle = "");
          let marker;
          if (obj.document !== "") {
            marker = (
              <div>
                <a className={textStyle} href={obj.document} target="_blank">
                  {text}
                </a>
              </div>
            );
          } else {
            marker = <div className={textStyle}>{text}</div>;
          }
          return (
            <div key={colIndex} className="col-sm">
              {marker}
            </div>
          );
        });
        let studentObj = attendance.students.find(
          (element) => element.student_id === studentId
        );
        let percent = ((count / attendance.sessions.length) * 100).toFixed(1);
        return (
          <div className={this.box} key={rowIndex}>
            <div className="col-sm">
              <img
                className={styles.avatar}
                src={studentObj.image}
                alt="student display picture"
              />
            </div>
            <div className="col-sm">
              <div>{studentObj.name}</div>
            </div>
            {box}
            <div className="col-sm">
              <div>
                {count} / {attendance.sessions.length} - {percent}%
              </div>
            </div>
          </div>
        );
      });
      return HTML;
    }
  };

  // render column headers
  renderColHeaders = () => {
    if (this.state.attendanceArray.length > 0) {
      let attendance = this.state.attendance;
      let HTML = attendance.sessions.map((element, index) => {
        // create object to be passed to mark attendance button
        let obj = {};
        obj.class = this.state.classObjSelected;
        obj.session = element;
        // generate date column header label
        let date = moment(element.start_datetime, "x").format(
          "DD/MM/YY hh:mmA"
        );
        return (
          <div className="col-sm" key={index}>
            {date}
            <div hidden={this.state.hide}>
              <MarkAttendance obj={obj} />
            </div>
          </div>
        );
      });
      return (
        <div className={this.boxHead}>
          <div className="col-sm"></div>
          <div className="col-sm">Student</div>
          {HTML}
          <div className="col-sm">Summary</div>
        </div>
      );
    }
  };

  render() {
    let grid = this.renderAttendanceGrid() || "";
    let head = this.renderColHeaders() || "";

    return (
      <div className="row">
        <div className="col-sm">
          <div className="row">
            <div className="col-sm-6">
              <ClassSelector
                classes={this.state.classes}
                findClassIdMatch={this.findClassIdMatch}
                classSelected={this.state.classSelected}
              />
            </div>
          </div>
          <div hidden={this.state.isHidden}>
            <p>
              Sorry, the class you have selected has no affiliated sessions or
              students yet.
            </p>
            <p hidden={this.state.hide}>
              <a href="/students">Add a student</a>
            </p>
            <p hidden={this.state.hide}>
              <a href="/calendar">Add a session</a>
            </p>
          </div>
          {head}
          {grid}
        </div>
      </div>
    );
  }
}

export default withRouter(AttendanceGrid);
