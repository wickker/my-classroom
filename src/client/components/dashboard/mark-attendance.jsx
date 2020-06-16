import React from "react";
import { get, isEmpty } from "lodash";
import { withRouter } from "react-router-dom";
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
import FormControlLabel from "@material-ui/core/FormControlLabel";

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
    const obj = get(props, "obj");
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
      masterCheck: false,
    };
  }

  // initialize
  componentDidUpdate = (prevProps) => {
    if (this.props === prevProps) {
      return;
    }
    let tracker = this.state.tracker;
    let obj = this.props.obj;
    let startDateTime = get(obj, "start_datetime") || "";
    let endDateTime = get(obj, "end_datetime") || "";
    if (!isEmpty(obj)) {
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
        tracker[element.student_id] = {};
        tracker[element.student_id]["isPresent"] = {};
        tracker[element.student_id]["isLate"] = {};
        tracker[element.student_id]["isPresent"]["og"] = element.is_present;
        tracker[element.student_id]["isPresent"]["current"] =
          element.is_present;
        let late = element.is_late === 1 ? true : false;
        tracker[element.student_id]["isLate"]["og"] = late;
        tracker[element.student_id]["isLate"]["current"] = late;
        tracker[element.student_id]["remarks"] = element.remarks;
        tracker[element.student_id]["document"] = element.document;
      });
    }
    tracker.classId = obj.class_id;
    tracker.sessionId = obj.session_id;
    return tracker;
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
    let data = this.state.tracker;
    this.setState({ open: false });
    let url = "/sessions/attendance/post";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        this.props.history.push(`/attendance?classid=${get(data, "classId")}`);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error:", error);
        // window.location.reload(false);
      });
  };

  setIsPresent = (event) => {
    let stuId = event.target.value;
    let tracker = this.state.tracker;
    tracker[stuId].isPresent.current = event.target.checked;
    this.setState({ tracker });
  };

  setIsLate = (event) => {
    let stuId = event.target.value;
    let tracker = this.state.tracker;
    tracker[stuId].isLate.current = event.target.checked;
    this.setState({ tracker });
  };

  setRemarks = (event) => {
    let remarks = event.target.value;
    let stuId = event.target.id;
    let tracker = this.state.tracker;
    tracker[stuId].remarks = remarks;
    this.setState({ tracker });
  };

  callback = (result, id) => {
    let tracker = this.state.tracker;
    tracker[id].document = result;
    this.setState({ tracker });
  };

  setMasterCheck = (event) => {
    let checked = event.target.checked;
    let tracker = this.state.tracker;
    if (checked) {
      for (const stuId in tracker) {
        if (!isNaN(parseInt(stuId))) {
          tracker[stuId].isPresent.current = true;
        }
      }
      this.setState({ tracker, masterCheck: true });
    } else {
      for (const stuId in tracker) {
        if (!isNaN(parseInt(stuId))) {
          tracker[stuId].isPresent.current = false;
        }
      }
      this.setState({ tracker, masterCheck: false });
    }
  };

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
        // let isPresentChecked;
        // element.is_present
        //   ? (isPresentChecked = true)
        //   : (isPresentChecked = false);
        // let isLateChecked;
        // element.is_late === 1
        //   ? (isLateChecked = true)
        //   : (isLateChecked = false);
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
                checked={get(
                  tracker,
                  `${element.student_id}.isPresent.current`
                )}
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
                checked={get(tracker, `${element.student_id}.isLate.current`)}
                color="primary"
                inputProps={{ "aria-label": "primary checkbox" }}
                onChange={this.setIsLate}
              />
            </div>
            <div className="col-sm-3">
              <textarea
                className={this.input}
                type="text"
                name="remarks"
                rows="2"
                id={element.student_id}
                defaultValue={get(tracker, `${element.student_id}.remarks`)}
                onChange={this.setRemarks}
              />
            </div>
            <div className="col-sm">
              <FileUpload
                document={get(tracker, `${element.student_id}.document`)}
                id={element.student_id}
                callback={this.callback}
              />
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
                  <div className="col-sm-1">
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="master_check"
                          color="primary"
                          onChange={this.setMasterCheck}
                          checked={this.state.masterCheck}
                        />
                      }
                      label="PRESENT"
                      style={{margin: "0px", letterSpacing: "1px"}}
                    />
                  </div>
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

export default withStyles(useStyles)(withRouter(MarkAttendance));
