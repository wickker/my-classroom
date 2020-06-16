import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import PropTypes from "prop-types";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import PlusCircle from "../../svg/plus-solid.svg";
import styles from "../all_styles.scss";
import { useEffect } from "react";
var moment = require("moment");

// main function starts here
export default function FormDialog({ classes, dateStr }) {
  // handles open and closing of form dialog
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setErrorMsg("");
    setOpen(false);
  };

  // rounds selected times to nearest 15 minutes
  const roundTimeQuarterHour = (time) => {
    let timeToReturn = new Date(time);
    timeToReturn.setMilliseconds(
      Math.round(timeToReturn.getMilliseconds() / 1000) * 1000
    );
    timeToReturn.setSeconds(Math.round(timeToReturn.getSeconds() / 60) * 60);
    timeToReturn.setMinutes(Math.round(timeToReturn.getMinutes() / 15) * 15);
    return timeToReturn;
  };

  // convert selected date into mS and sets default session start date
  let dateFormatted = moment(dateStr, "D-M-YYYY").format();
  let dateBigInt = moment(dateStr, "D-M-YYYY").valueOf();
  // set default value of time pickers to current time rounted to nearest quarter
  let d = new Date();
  let roundedTime = roundTimeQuarterHour(d);
  let timeString = moment(roundedTime).format("HH:mm");
  let datetimeStr = dateStr + " " + timeString;
  let millisec = moment(datetimeStr, "D-M-YYYY HH:mm").valueOf();
  const [selectedStartTime, setSelectedStartTime] = React.useState(roundedTime);
  const [selectedEndTime, setSelectedEndTime] = React.useState(roundedTime);

  // set other variables to post
  const [classId, setClassId] = React.useState("");
  const [startDateTime, setStartDateTime] = React.useState(millisec);
  const [endDateTime, setEndDateTime] = React.useState(millisec);
  const [location, setLocation] = React.useState("");
  const [frequency, setFrequency] = React.useState("");
  const [upTillDate, setUpTillDate] = React.useState(dateBigInt);
  const [upTillDateDisplay, setUpTillDateDisplay] = React.useState(
    dateFormatted
  );
  // form validation error message
  const [errorMsg, setErrorMsg] = React.useState("");

  const selectClassId = (event) => {
    setClassId(event.target.value);
  };

  const selectStartDateTime = (event) => {
    // round and set selected start time
    let rounded = roundTimeQuarterHour(event);
    setSelectedStartTime(rounded);
    // convert selected start time into mS
    let timeStr = moment(rounded).format("HH:mm");
    let dtStr = dateStr + " " + timeStr;
    let mS = moment(dtStr, "D-M-YYYY HH:mm").valueOf();
    setStartDateTime(mS);
  };

  const selectEndDateTime = (event) => {
    // round and set selected end time
    let rounded = roundTimeQuarterHour(event);
    if (rounded < selectedStartTime) {
      setErrorMsg("End time cannot precede start time.");
      return;
    }
    setSelectedEndTime(rounded);
    setErrorMsg("");
    // convert selected start time into mS
    let timeStr = moment(rounded).format("HH:mm");
    let dtStr = dateStr + " " + timeStr;
    let mS = moment(dtStr, "D-M-YYYY HH:mm").valueOf();
    setEndDateTime(mS);
  };

  const selectLocation = (event) => {
    setLocation(event.target.value);
  };

  const selectFreq = (event) => {
    setFrequency(event.target.value);
  };

  const selectUpTill = (event) => {
    setUpTillDateDisplay(event);
    let mS = moment(event).valueOf();
    mS = mS + 82800000 + 3540000;
    setUpTillDate(mS);
  };

  // post data
  const submit = () => {
    let data = {
      classId: classId,
      startDateTime: startDateTime,
      endDateTime: endDateTime,
      location: location,
      frequency: frequency,
      upTillDate: upTillDate,
    };
    // validation
    for (const key in data) {
      if (data[key] === "") {
        setErrorMsg("Please complete all fields.");
        return;
      }
    }
    // close form dialog
    setOpen(false);
    // post to server
    let url = "/sessions/post";
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
        window.location.reload(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        window.location.reload(false);
      });
  };

  // generate select class drop down list
  const renderClassDropdown = () => {
    let classesHTML = classes.map((element, index) => {
      return (
        <MenuItem value={element.id} key={index}>
          {element.title}
        </MenuItem>
      );
    });
    return (
      <FormControl fullWidth>
        <InputLabel>Select Class</InputLabel>
        <Select onChange={selectClassId} required>
          <MenuItem value="" disabled>
            Select Class
          </MenuItem>
          {classesHTML}
        </Select>
      </FormControl>
    );
  };

  let selectClass = renderClassDropdown();

  useEffect(() => {
    setUpTillDateDisplay(dateFormatted);
  }, [dateFormatted]);

  return (
    <span>
      {/* plus icon to add new session */}
      <img
        className={styles.svg_icon}
        src={PlusCircle}
        onClick={handleClickOpen}
      />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth
      >
        <div className="row">
          <div className="col-sm">
            <DialogContent>
              <div className={styles.form_title}>New Session</div>
              <div className={styles.error}>{errorMsg}</div>
              {/* select class drop down */}
              {selectClass}
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disabled
                  fullWidth
                  variant="inline"
                  format="dd/MM/yyyy"
                  margin="normal"
                  label="Start Date"
                  value={dateFormatted}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
                <div className="row mt-2">
                  <div className="col-sm">
                    <KeyboardTimePicker
                      fullWidth
                      label="Start Time"
                      value={selectedStartTime}
                      onChange={selectStartDateTime}
                      KeyboardButtonProps={{
                        "aria-label": "change time",
                      }}
                      required
                    />
                  </div>
                  <div className="col-sm">
                    <KeyboardTimePicker
                      fullWidth
                      label="End Time"
                      value={selectedEndTime}
                      onChange={selectEndDateTime}
                      KeyboardButtonProps={{
                        "aria-label": "change time",
                      }}
                      required
                    />
                  </div>
                </div>
              </MuiPickersUtilsProvider>
              <TextField
                margin="dense"
                label="Location"
                onChange={selectLocation}
                fullWidth
                required
              />
              <div className="row">
                <div className="col-sm mt-3">
                  <FormControl fullWidth>
                    <InputLabel>Select Frequency</InputLabel>
                    <Select onChange={selectFreq} required>
                      <MenuItem value="" disabled>
                        Select Frequency
                      </MenuItem>
                      <MenuItem value="1">Ad Hoc (i.e. once off)</MenuItem>
                      <MenuItem value="2">Daily</MenuItem>
                      <MenuItem value="3">Weekly</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div className="col-sm">
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      disableToolbar
                      fullWidth
                      variant="inline"
                      format="dd/MM/yyyy"
                      margin="normal"
                      label="Up Till"
                      value={upTillDateDisplay}
                      onChange={selectUpTill}
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                      required
                    />
                  </MuiPickersUtilsProvider>
                </div>
              </div>
            </DialogContent>
          </div>
        </div>
        <DialogActions className="mr-3">
          <button className={styles.button} onClick={submit}>
            Submit
          </button>
        </DialogActions>
      </Dialog>
    </span>
  );
}

FormDialog.propTypes = {
  classes: PropTypes.array,
  dateStr: PropTypes.string,
};
