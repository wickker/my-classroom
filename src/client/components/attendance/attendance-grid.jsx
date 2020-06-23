import React from "react";
import ClassSelector from "./class-selector";
import { get } from "lodash";
import styles from "../all_styles.scss";
import { withRouter } from "react-router-dom";
var classNames = require("classnames");
const cx = classNames.bind(styles);
var moment = require("moment");
import MarkAttendance from "../dashboard/mark-attendance";
import { Document } from "react-pdf";
import eyeIcon from "../../svg/eye-regular.svg";

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
      url: "",
      attendanceIcon: true,
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
    this.setState({ classObjSelected: obj, url: "" });
  };

  // get class object from end point
  initSelectedClassForId = async (classId) => {
    const params = { classId: classId };

    if (!isNaN(parseInt(classId, 10))) {
      let url = `/sessions/attendance?classId=${classId}`;
      let response = await fetch(url);
      let data = await response.json();
      // sort students by name and sessions by time in class object
      let studentsByName = data.students.sort(this.compareName);
      data.students = studentsByName;
      let sessionsByTime = data.sessions.sort(this.compareTime);
      data.sessions = sessionsByTime;
      this.initAttendanceArray(data);
    }
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

  // set url of supporting document if exists; convert pdf files to jpg
  setURL = (event) => {
    let url = event.target.id;
    let result = url.replace("pdf", "jpg");
    this.setState({ url: result });
  };

  // render supporting document
  displayImage = () => {
    let url = this.state.url;
    if (url !== "") {
      return (
        <div className="row">
          <div className="col-sm mt-3">
            <div className={styles.form_title}>Supporting Document</div>
            <img className="mt-2" src={url} style={{ maxWidth: "70%" }} />
          </div>
        </div>
      );
    }
  };

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
                <span className={textStyle}>{text}</span>
                <span>
                  <img
                    id={obj.document}
                    onClick={this.setURL}
                    src={eyeIcon}
                    className={styles.viewDoc}
                  />
                </span>
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
        let obj = element;
        obj.title = this.state.classObjSelected.title;
        obj.description = this.state.classObjSelected.description;
        obj.image = this.state.classObjSelected.image;
        let studentsFiltered = this.state.classObjSelected.students.filter(
          (stu) => stu.session_id === element.session_id
        );
        obj.students = studentsFiltered;
        // generate date column header label
        let date = moment(element.start_datetime, "x").format("DD/MM h:mmA");
        return (
          <div className="col-sm" key={index}>
            {date}
            <div hidden={this.state.hide}>
              <MarkAttendance
                obj={obj}
                attendanceIcon={this.state.attendanceIcon}
              />
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
    let display = this.displayImage() || "";

    return (
      <div className="row">
        <div className="col-sm">
          <div className="row">
            <div className="col-sm-6 mt-2">
              <ClassSelector
                classes={this.state.classes}
                findClassIdMatch={this.findClassIdMatch}
                classSelected={this.state.classSelected}
              />
            </div>
          </div>
          <div className={styles.card_text} hidden={this.state.isHidden}>
            <div className="mt-3">
              Sorry, the class you have selected has no affiliated sessions or
              students yet.
            </div>
            <div hidden={this.state.hide}>
              <a href="/students">Add a student</a>
            </div>
            <div hidden={this.state.hide}>
              <a href="/calendar">Add a session</a>
            </div>
          </div>
          <div>
            {head}
            {grid}
          </div>
          {display}
        </div>
      </div>
    );
  }
}

export default withRouter(AttendanceGrid);
