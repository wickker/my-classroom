import React from "react";
import ClassSelector from "./class-selector";
import styles from "./attendance.scss";
var classNames = require("classnames");
const cx = classNames.bind(styles);
var moment = require("moment");

export default class AttendanceGrid extends React.Component {
  constructor() {
    super();
    this.state = {
      classes: [],
      attendance: [],
      attendanceArray: [],
      isHidden: true,
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

  compareTime = (a, b) => {
    return a.start_datetime - b.start_datetime;
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
        let studentsByName = data.students.sort(this.compareName);
        data.students = studentsByName;
        let sessionsByTime = data.sessions.sort(this.compareTime);
        data.sessions = sessionsByTime;
        console.log("sorted: ", data);
        this.initAttendanceArray(data);
      });
  };

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
    console.log(array);
    if (array.length === 0 || array[0].length === 0) {
      this.setState({ isHidden: !this.state.isHidden });
    }
    this.setState({ attendance, attendanceArray: array });
  };

  componentDidMount = () => {
    this.getClasses();
  };

  box = cx(styles.box_row, "row", "mb-2", "mt-2");

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

  boxHead = cx(styles.box_head, "row", "mb-2", "mt-4");

  renderColHeaders = () => {
    if (this.state.attendanceArray.length > 0) {
      let attendance = this.state.attendance;
      let HTML = attendance.sessions.map((element, index) => {
        let date = moment(element.start_datetime, "x").format(
          "DD/MM/YY hh:mmA"
        );
        return (
          <div className="col-sm" key={index}>
            {date}
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
              />
            </div>
          </div>
          <div hidden={this.state.isHidden}>
            <p>
              Sorry, the class you have selected has no affiliated sessions or
              students yet.
            </p>
            <p>
              <a href="/students">Add a student</a>
            </p>
            <p>
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
