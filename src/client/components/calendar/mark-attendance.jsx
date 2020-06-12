import React from "react";
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
import styles from "./calendar.scss";
import FileUpload from "./file-upload";
import Checkbox from "@material-ui/core/Checkbox";
import SaveIcon from "@material-ui/icons/Save";

var classNames = require("classnames");
const cx = classNames.bind(styles);

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

export default function MarkAttendance({ obj }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  let title = "";
  let date = "";
  let startTime = "";
  let endTime = "";
  let id = "";

  if (obj !== "") {
    title = obj.class.title;
    id = obj.class.id;
    date = moment(obj.session.start_datetime, "x").format("DD MMMM YYYY");
    startTime = moment(obj.session.start_datetime, "x").format("hh:mm A");
    endTime = moment(obj.session.end_datetime, "x").format("hh:mm A");
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    setOpen(false);
    // alert("Attendance submitted");
  };

  const attenRow = cx(styles.attenRow, "col-sm", "mb-4", "mt-2");

  const attenHead = cx(styles.attenHead, "col-sm", "mb-4", "mt-2");

  const renderTable = () => {
    if (obj !== "" && obj.class.students.length > 0) {
      let sessionId = obj.session.id;
      let studentsFiltered = obj.class.students.filter((element) => {
        return element.session_id === sessionId && element.is_delete === false;
      });
      if (studentsFiltered.length > 0) {
        let studentsHTML = studentsFiltered.map((element, index) => {
          let isPresentChecked;
          element.is_present
            ? (isPresentChecked = true)
            : (isPresentChecked = false);

          let isLateChecked;
          element.is_late === 1 ? (isLateChecked = true) : (isLateChecked = false);

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
                {/* <input
                type="checkbox"
                name="is_present"
                defaultValue={element.id}
                defaultChecked={isPresentChecked}
              /> */}
              </div>
              <div className="col-sm-1">
                <Checkbox
                  name="is_late"
                  value={element.id}
                  defaultChecked={isLateChecked}
                  color="primary"
                  inputProps={{ "aria-label": "primary checkbox" }}
                />
                {/* <input
                type="checkbox"
                name="is_late"
                defaultValue={element.id}
                defaultChecked={isLateChecked}
              /> */}
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
            {/* <Button autoFocus color="inherit" onClick={handleSave}>
              Save
            </Button> */}
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

                <input name="classId" value={id} hidden></input>

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

                {/* <button
                  className={styles.save}
                  type="submit"
                  onClick={handleSave}
                >
                  Save
                </button> */}
              </form>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
