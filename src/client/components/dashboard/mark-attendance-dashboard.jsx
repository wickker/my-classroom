import React from "react";
import { get } from "lodash";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
var moment = require("moment");
import styles from "./dashboard.scss";
import FileUpload from "./file-upload-dashboard";
import Checkbox from "@material-ui/core/Checkbox";
import SaveIcon from "@material-ui/icons/Save";
var classNames = require("classnames");
const cx = classNames.bind(styles);

// styles
const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// main function starts here
export default function MarkAttendance({ obj }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  let title = get(obj, "title") || "";
  let startDateTime = get(obj, "start_datetime") || "";
  let endDateTime = get(obj, "end_datetime") || "";
  let date = moment(startDateTime, "x").format("DD MMMM YYYY");
  let startTime = moment(startDateTime, "x").format("hh:mm A");
  let endTime = moment(endDateTime, "x").format("hh:mm A");
  let id = get(obj, "class_id") || "";
  let students = get(obj, "students") || "";
  let sessionId = get(obj, "session_id") || "";

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    setOpen(false);
  };

  // more styles
  const attenRow = cx(styles.attenRow, "col-sm", "mb-4", "mt-2");
  const attenHead = cx(styles.attenHead, "col-sm", "mb-4", "mt-2");

  // render main mark attendance table
  const renderTable = () => {
    if (!!students && students !== "" && students.length > 0) {
      let studentsHTML = students.map((element, index) => {
        // define isPresent checked status
        let isPresentChecked;
        element.is_present
          ? (isPresentChecked = true)
          : (isPresentChecked = false);
        // define isLate checked status
        let isLateChecked;
        element.is_late === 1
          ? (isLateChecked = true)
          : (isLateChecked = false);
        return (
          <div className={attenRow} key={index}>
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
                defaultChecked={isPresentChecked}
                color="primary"
                inputProps={{ "aria-label": "primary checkbox" }}
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
                className="form-control"
                type="text"
                name="remarks"
                rows="2"
                defaultValue={element.remarks}
              />
            </div>
            <div className="col-sm">
              <FileUpload document={element.document} id={element.student_id} />
            </div>
            <div className="col-sm" hidden>
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
                defaultValue={sessionId}
                hidden
              />
            </div>
          </div>
        );
      });
      return studentsHTML;
    }
  };

  let studentsHTML = renderTable() || "";

  return (
    <div>
      <Button
        variant="contained"
        size="small"
        color="primary"
        onClick={handleClickOpen}
      >
        Mark Attendance
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Mark Attendance
            </Typography>
          </Toolbar>
        </AppBar>

        <div className={styles.attendance}>
          <div className="row">
            <div className="col-sm">
              <div className={styles.title}>
                <h5>Class: {title}</h5>
                <p>
                  Session: {date}, {startTime} - {endTime}
                </p>
              </div>

              <div className={attenHead}>
                <div className="col-sm-1"></div>
                <div className="col-sm-2">Student Name</div>
                <div className="col-sm-1">Present</div>
                <div className="col-sm-1">Late</div>
                <div className="col-sm-3">Remarks</div>
                <div className="col-sm">Upload Document</div>
              </div>

              <form action="/sessions/attendance/post" method="post">
                {studentsHTML}

                <input name="classId" defaultValue={id} hidden></input>

                <div className="row">
                  <div className="col-sm">
                    <div className={styles.save}>
                      <Button
                        variant="contained"
                        type="submit"
                        onClick={handleSave}
                        size="large"
                        color="primary"
                        className={classes.button}
                        startIcon={<SaveIcon />}
                      >
                        Save
                      </Button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
