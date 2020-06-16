import React from "react";
import { get, isEmpty } from "lodash";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
var moment = require("moment");
import FileUpload from "./file-upload-dashboard";
import Checkbox from "@material-ui/core/Checkbox";
var classNames = require("classnames");
const cx = classNames.bind(styles);
import styles from "../all_styles.scss";
import EditIcon from "../../svg/edit-regular.svg";

// styles
const useStyles = (theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// main class
class MarkAttendance extends React.Component {
  constructor(props) {
    super();
    const obj = get(props, 'obj');
    const tracker = this.initTracker(obj);
    const title = get(obj, "title") || "";
    const startDateTime = get(obj, "start_datetime") || "";
    const endDateTime = get(obj, "end_datetime") || "";
    const date = moment(startDateTime, "x").format("DD MMMM YYYY");
    const startTime = moment(startDateTime, "x").format("hh:mm A");
    const endTime = moment(endDateTime, "x").format("hh:mm A");
    const id = get(obj, "class_id") || "";
    const students = get(obj, "students") || "";
    const sessionId = get(obj, "session_id") || "";
    this.state = {
      open: false,
      title,
      date,
      startTime,
      endTime,
      id,
      students,
      sessionId,
      attendanceIcon: props.attendanceIcon,
      obj,
      tracker,
    };
  }

  // componentDidMount = () => {
  //   this.setState({
  //     tracker: this.initTracker(this.props.obj),
  //   })
  // }

  // initialize
  componentDidUpdate = (prevProps) => {
    if (this.props === prevProps) {
      return;
    }
    console.log('inside component did update');
    let tracker = this.state.tracker;
    let obj = this.props.obj;
    let startDateTime = get(obj, "start_datetime") || "";
    let endDateTime = get(obj, "end_datetime") || "";
    if (!isEmpty(obj)) {
      console.log("INIT TRACKER RUNS");
      tracker = this.initTracker(obj);
    }
    this.setState({
      title: get(obj, "title") || "",
      date: moment(startDateTime, "x").format("DD MMMM YYYY"),
      startTime: moment(startDateTime, "x").format("hh:mm A"),
      endTime: moment(endDateTime, "x").format("hh:mm A"),
      id: get(obj, "class_id") || "",
      students: get(obj, "students") || "",
      sessionId: get(obj, "session_id") || "",
      obj,
      attendanceIcon: this.props.attendanceIcon,
      tracker,
    });
  };

  initTracker = (obj) => {
    let tracker = {};
    if (obj.students) {
      obj.students.forEach((element) => {
        tracker[element.id] = {};
        tracker[element.id]["isPresent"] = {};
        tracker[element.id]["isLate"] = {};
        tracker[element.id]["isPresent"]["og"] = element.is_present;
        tracker[element.id]["isPresent"]["current"] = element.is_present;
        let late = element.is_late === 1 ? true : false;
        tracker[element.id]["isLate"]["og"] = late;
        tracker[element.id]["isLate"]["current"] = late;
        tracker[element.id]["remarks"] = element.remarks;
        tracker[element.id]["document"] = element.document;
      });
    }
    tracker.classId = obj.class_id;
    tracker.sessionId = obj.session_id;
    return tracker;
    // this.setState({ tracker });
  };

  // sort helper function
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

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSave = () => {
    this.setState({ open: false });
  };

  setIsPresent = (event) => {
    console.log(event.target.checked);
    console.log(event.target.value);
    let stuId = event.target.value;
    let tracker = this.state.tracker;
    tracker[stuId].isPresent.current = event.target.checked;
    console.log(tracker);
    
  }

  // more styles
  attenRow = cx(styles.attenRow, "col-sm", "mb-4", "mt-2");
  attenHead = cx(styles.attenHead, "col-sm", "mb-4", "mt-3");
  input = cx(styles.input_field, "form-control");

  // render main mark attendance table
  renderTable = () => {
    let students = this.state.students;
    if (!!students && students !== "" && students.length > 0) {
      let studentsSort = students.sort(this.compareName);
      let studentsHTML = studentsSort.map((element, index) => {
        let isPresentChecked;
        element.is_present
          ? (isPresentChecked = true)
          : (isPresentChecked = false);
        let isLateChecked;
        element.is_late === 1
          ? (isLateChecked = true)
          : (isLateChecked = false);
        let tracker = this.state.tracker;
        return (
          <div className={this.attenRow} key={index}>
            <div className="col-sm-1">
              <img
                className={styles.avatar}
                src={element.image}
                alt="student display picture"
              />
            </div>
            <div className="col-sm-2">{element.name}</div>
            <div className="col-sm-1">
              <Checkbox
                name="is_present"
                value={element.student_id}
                checked={get(tracker, `${element.id}.isPresent.current`)}
                // defaultChecked={isPresentChecked}
                color="primary"
                inputProps={{ "aria-label": "primary checkbox" }}
                onChange={this.setIsPresent}
              />
            </div>
            <div className="col-sm-1">
              <Checkbox
                name="is_late"
                value={element.student_id}
                defaultChecked={isLateChecked}
                color="primary"
                inputProps={{ "aria-label": "primary checkbox" }}
              />
            </div>
            <div className="col-sm-3">
              <textarea
                className={this.input}
                type="text"
                name="remarks"
                rows="2"
                defaultValue={element.remarks}
              />
            </div>
            <div className="col-sm">
              <FileUpload document={element.document} id={element.student_id} />
            </div>
            {/* <div className="col-sm" hidden>
              <input
                type="text"
                name="student_id_order"
                defaultValue={element.student_id}
                hidden
              />
            </div>
            <div className="col-sm" hidden>
              <input
                type="text"
                name="session_id"
                defaultValue={this.state.sessionId}
                hidden
              />
            </div> */}
          </div>
        );
      });
      return studentsHTML;
    }
  };

  render() {
    let studentsHTML = this.renderTable() || "";

    return (
      <div>
        <button
          className={styles.button}
          onClick={this.handleClickOpen}
          hidden={this.state.attendanceIcon}
        >
          Mark Attendance
        </button>
        <img
          src={EditIcon}
          className={styles.viewDoc}
          onClick={this.handleClickOpen}
          hidden={!this.state.attendanceIcon}
        />
        <Dialog
          fullScreen
          open={this.state.open}
          onClose={this.handleClose}
          TransitionComponent={Transition}
        >
          <AppBar
            className={this.props.classes.appBar}
            style={{ background: "#1e2333" }}
          >
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={this.handleClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <div className={styles.mark_att_header}>Mark Attendance</div>
            </Toolbar>
          </AppBar>
          <div className={styles.attendance}>
            <div className="row">
              <div className="col-sm">
                {/* class and session title */}
                <div className="ml-4 pl-1 mt-4 mb-4">
                  <div className={styles.mark_att_title}>
                    Class: {this.state.title}
                  </div>
                  <div className={styles.card_text}>
                    Session: {this.state.date}, {this.state.startTime} -{" "}
                    {this.state.endTime}
                  </div>
                </div>
                {/* table header starts here */}
                <div className={this.attenHead}>
                  <div className="col-sm-1"></div>
                  <div className="col-sm-2">Student Name</div>
                  <div className="col-sm-1">Present</div>
                  <div className="col-sm-1">Late</div>
                  <div className="col-sm-3">Remarks</div>
                  <div className="col-sm">Upload Document</div>
                </div>
                {/* attendance form table starts here */}
                {/* <form action="/sessions/attendance/post" method="post"> */}
                {studentsHTML}
                {/* <input
                  name="classId"
                  defaultValue={this.state.id}
                  hidden
                ></input> */}
                <div className="row">
                  <div className="col-sm">
                    <div className="ml-4 pl-1">
                      <button
                        onClick={this.handleSave}
                        className={styles.button}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
                {/* </form> */}
              </div>
            </div>
          </div>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(useStyles)(MarkAttendance);
