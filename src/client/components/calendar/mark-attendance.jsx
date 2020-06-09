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
// import PropTypes from "prop-types";
var moment = require("moment");
import styles from "./calendar.scss";

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

  if (obj !== "") {
    title = obj.class.title;
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
  };

  const renderTable = () => {
    if (obj !== "" && obj.class.students.length > 0) {
      let studentsHTML = obj.class.students.map((element, index) => {
        return (
          <div className="row" key={index}>
            <div className="col-sm-1">
              <img
                className={styles.avatar}
                src={element.image}
                alt="student display picture"
              />
            </div>
            <div className="col-sm-2">{element.name}</div>
            <div className="col-sm-1">
              <input type="checkbox" name="is_present" defaultValue={element.id}/>
            </div>
            <div className="col-sm-1">
              <input type="checkbox" name="is_late" defaultValue={element.id} />
            </div>
            <div className="col-sm">
              <input type="text" name="remarks" />
            </div>
            <div className="col-sm">
              <input type="file" name="document" />
            </div>
            <div className="col-sm" hidden>
              <input type="text" name="student_id_order" defaultValue={element.id} hidden/>
            </div>
            <div className="col-sm" hidden>
              <input type="text" name="session_id" defaultValue={obj.session.id} hidden/>
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
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
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
              <h5>{title}</h5>
              <p>{date}</p>
              <p>
                {startTime} - {endTime}
              </p>

              <div className="row mb-2">
                <div className="col-sm-1"></div>
                <div className="col-sm-2"></div>
                <div className="col-sm-1">Present</div>
                <div className="col-sm-1">Late</div>
                <div className="col-sm">Remarks</div>
                <div className="col-sm">Upload Document</div>
              </div>
              <form action="/sessions/attendance/post" method="post">
                {studentsHTML}
                <button
                  type="submit"
                  onClick={handleClose}
                >
                  Save
                </button>
              </form>
            </div>
          </div>
        </div>

      </Dialog>
    </div>
  );
}
