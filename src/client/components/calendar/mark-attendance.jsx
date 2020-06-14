import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
// import ListItemText from "@material-ui/core/ListItemText";
// import ListItem from "@material-ui/core/ListItem";
// import List from "@material-ui/core/List";
// import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
var moment = require("moment");
import styles from "../all_styles.scss";
import FileUpload from "./file-upload";
import Checkbox from "@material-ui/core/Checkbox";
import SaveIcon from "@material-ui/icons/Save";
var classNames = require("classnames");
const cx = classNames.bind(styles);
import { get, isEmpty } from "lodash";

// component styles
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

// main function begins
export default function MarkAttendance({ object }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  // check if session object is empty and if not, define variables
  let obj = object;
  let title = get(obj, "class.title") || "";
  let startDateTime = get(obj, "session.start_datetime") || "";
  let date = moment(startDateTime, "x").format("DD MMMM YYYY");
  let startTime = moment(startDateTime, "x").format("hh:mm A");
  let endDateTime = get(obj, "session.end_datetime") || "";
  let endTime = moment(endDateTime, "x").format("hh:mm A");
  let id = get(obj, "class.id") || "";

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

  // render mark attendance table
  const renderTable = () => {
    if (!isEmpty(obj) && obj.class.students.length > 0) {
      let sessionId = obj.session.id;
      // get only students enrolled in selected sessionId
      let studentsFiltered = obj.class.students.filter((element) => {
        return element.session_id === sessionId && element.is_delete === false;
      });
      if (studentsFiltered.length > 0) {
        let studentsHTML = studentsFiltered.map((element, index) => {
          // set initial value of present checkbox
          let isPresentChecked;
          element.is_present
            ? (isPresentChecked = true)
            : (isPresentChecked = false);
          // set initial value of late checkbox
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
                  value={element.id}
                  defaultChecked={isPresentChecked}
                  color="primary"
                  inputProps={{ "aria-label": "primary checkbox" }}
                />
              </div>
              <div className="col-sm-1">
                <Checkbox
                  name="is_late"
                  value={element.id}
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
                <FileUpload document={element.document} id={element.id} />
              </div>
              {/* hidden input fields begins here */}
              <div className="col-sm" hidden>
                <input
                  type="text"
                  name="student_id_order"
                  defaultValue={element.id}
                  hidden
                />
              </div>
              <div className="col-sm" hidden>
                <input
                  type="text"
                  name="session_id"
                  defaultValue={obj.session.id}
                  hidden
                />
              </div>
            </div>
          );
        });
        return studentsHTML;
      }
    }
  };

  let studentsHTML = renderTable() || "";

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
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
              {/* page label */}
              <div className={styles.title}>
                <h5>Class: {title}</h5>
                <p>
                  Session: {date}, {startTime} - {endTime}
                </p>
              </div>
              {/* table headers */}
              <div className={attenHead}>
                <div className="col-sm-1"></div>
                <div className="col-sm-2">Student Name</div>
                <div className="col-sm-1">Present</div>
                <div className="col-sm-1">Late</div>
                <div className="col-sm-3">Remarks</div>
                <div className="col-sm">Upload Document</div>
              </div>
              {/* form begins here */}
              <form action="/sessions/attendance/post" method="post">
                {studentsHTML}
                {/* another hidden input */}
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
              {/* form ends here */}
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
