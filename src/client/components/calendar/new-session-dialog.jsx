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
import Icon from '@material-ui/core/Icon';

var moment = require("moment");

export default function FormDialog({ classes, dateStr }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  let dateFormatted = moment(dateStr, "D-M-YYYY").format();
  let dateBigInt = moment(dateStr, "D-M-YYYY").valueOf();
  const [selectedDate, setSelectedDate] = React.useState(dateFormatted);

  function roundTimeQuarterHour(time) {
    var timeToReturn = new Date(time);
    timeToReturn.setMilliseconds(
      Math.round(timeToReturn.getMilliseconds() / 1000) * 1000
    );
    timeToReturn.setSeconds(Math.round(timeToReturn.getSeconds() / 60) * 60);
    timeToReturn.setMinutes(Math.round(timeToReturn.getMinutes() / 15) * 15);
    return timeToReturn;
  }

  let d = new Date();
  let roundedTime = roundTimeQuarterHour(d);
  let timeString = moment(roundedTime).format('HH:mm');
  let datetimeStr = dateStr + " " + timeString;
  let millisec = moment(datetimeStr, "D-M-YYYY HH:mm").valueOf();

  const [selectedStartTime, setSelectedStartTime] = React.useState(roundedTime);

  const [selectedEndTime, setSelectedEndTime] = React.useState(roundedTime);

  // to post 
  const [classId, setClassId] = React.useState("");
  const [startDateTime, setStartDateTime] = React.useState(millisec);
  const [endDateTime, setEndDateTime] = React.useState(millisec);
  const [location, setLocation] = React.useState("");
  const [frequency, setFrequency] = React.useState("");
  const [upTillDate, setUpTillDate] = React.useState(dateBigInt);
  const [upTillDateDisplay, setUpTillDateDisplay] = React.useState(dateFormatted);

  const selectClassId = (event) => {
    setClassId(event.target.value);
  }

  const selectStartDateTime = (event) => {
    let rounded = roundTimeQuarterHour(event);
    setSelectedStartTime(rounded);
    let timeStr = moment(rounded).format('HH:mm');
    console.log(timeStr);
    let dtStr = dateStr + " " + timeStr;
    let mS = moment(dtStr, "D-M-YYYY HH:mm").valueOf();
    console.log(mS);
    setStartDateTime(mS);
  }

  const selectEndDateTime = (event) => {
    let rounded = roundTimeQuarterHour(event);
    setSelectedEndTime(rounded);
    let timeStr = moment(rounded).format('HH:mm');
    console.log(timeStr);
    let dtStr = dateStr + " " + timeStr;
    let mS = moment(dtStr, "D-M-YYYY HH:mm").valueOf();
    console.log(mS);
    setEndDateTime(mS);
  }

  const selectLocation = (event) => {
    console.log(event.target.value);
    setLocation(event.target.value);
  }

  const selectFreq = (event) => {
    console.log(event.target.value);
    setFrequency(event.target.value);
  }

  const selectUpTill = (event) => {
    console.log(event);
    setUpTillDateDisplay(event);
    let mS = moment(event).valueOf();
    mS = mS + 82800000 + 3540000;
    console.log(mS);
    setUpTillDate(mS);
  }

  const submit = () => {
    setOpen(false);
    let data = {
      classId: classId,
      startDateTime: startDateTime,
      endDateTime: endDateTime,
      location: location,
      frequency: frequency,
      upTillDate: upTillDate,
    }
    console.log(data);
    let url = '/sessions/post';
    fetch(url, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        location.reload();
      })
      .catch((error) => {
        console.error('Error:', error);
        location.reload();
      });
  };

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
        <Select onChange={selectClassId}>
          <MenuItem value="" disabled>
            Select Class
          </MenuItem>
          {classesHTML}
        </Select>
      </FormControl>
    );
  };

  let selectClass = renderClassDropdown();

  return (
    <div>
      <i class="fas fa-plus-circle"></i>
      {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Add
      </Button> */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth
      >
        <div className="row">
          <div className="col-sm">
            <DialogTitle>Add New Session</DialogTitle>
            <DialogContent>
              {selectClass}

              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disabled
                  fullWidth
                  variant="inline"
                  format="dd/MM/yyyy"
                  margin="normal"
                  label="Start Date"
                  value={selectedDate}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
                <div className="row">
                  <div className="col-sm">
                    <KeyboardTimePicker
                      label="Start Time"
                      value={selectedStartTime}
                      onChange={selectStartDateTime}
                      KeyboardButtonProps={{
                        "aria-label": "change time",
                      }}
                    />
                  </div>
                  <div className="col-sm">
                    <KeyboardTimePicker
                      label="Time picker"
                      value={selectedEndTime}
                      onChange={selectEndDateTime}
                      KeyboardButtonProps={{
                        "aria-label": "change time",
                      }}
                    />
                  </div>
                </div>
              </MuiPickersUtilsProvider>
              <TextField
                // autoFocus
                margin="dense"
                label="Location"
                onChange={selectLocation}
                fullWidth
              />
              <div className="row">
                <div className="col-sm mt-3">
                  <FormControl fullWidth>
                    <InputLabel>Select Frequency</InputLabel>
                    <Select onChange={selectFreq}>
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
                    />
                  </MuiPickersUtilsProvider>
                </div>
              </div>
            </DialogContent>
          </div>
        </div>
        <DialogActions>
          <Button color="primary" onClick={submit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

FormDialog.propTypes = {
  classes: PropTypes.array,
  dateStr: PropTypes.string,
};
