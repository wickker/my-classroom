import React, { useState, useEffect } from "react";
import { isEqual } from "lodash";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
var moment = require("moment");
import { get, isEmpty } from "lodash";

export default class EditSession extends React.Component {
  constructor() {
    super();
    this.state = {
      isClick: false,
      classes: [],
      obj: {},
      classId: "",
      date: "",
      startTime: "",
      startTimeMS: "",
      endTime: "",
      location: "",
      sessionId: "",
      errorMsg: "",
    };
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps === this.props) {
      return;
    }
    let obj = get(this.props, "obj") || {};
    let classes = get(this.props, "classesArr") || [];
    let startDate = get(obj, "session.start_datetime") || "";
    let endDate = get(obj, "session.end_datetime") || "";
    this.setState({
      classes,
      obj,
      classId: get(obj, "class.id") || "",
      sessionId: get(obj, "session.id") || "",
      date: moment(startDate, "x").format(),
      startTime: moment(startDate, "x").format(),
      startTimeMS: moment(startDate, "x").valueOf(),
      endTime: moment(endDate, "x").format(),
      location: get(obj, "session.location") || "",
    });
  };

  // convert time picker format to mS
  convertTimeToMS = (time) => {
    let dateStr = moment(this.state.date).format("D-M-YYYY");
    let timeStr = moment(time).format("HH:mm");
    let dtStr = dateStr + " " + timeStr;
    let mS = moment(dtStr, "D-M-YYYY HH:mm").valueOf();
    return mS;
  };

  submit = () => {
    // create data object to send to server
    let data = {
      classId: this.state.classId,
      sessionId: this.state.sessionId,
      startDateTime: this.convertTimeToMS(this.state.startTime),
      endDateTime: this.convertTimeToMS(this.state.endTime),
      location: this.state.location,
    };
    // validation
    for (const key in data) {
      if (data[key] === "") {
        this.setState({ errorMsg: "Please complete all fields." });
        return;
      }
    }
    // post session details update
    this.setState({ isClick: !this.state.isClick });
    let url = "/sessions/edit";
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

  // round time to quarter
  roundTimeQuarterHour(time) {
    var timeToReturn = new Date(time);
    timeToReturn.setMilliseconds(
      Math.round(timeToReturn.getMilliseconds() / 1000) * 1000
    );
    timeToReturn.setSeconds(Math.round(timeToReturn.getSeconds() / 60) * 60);
    timeToReturn.setMinutes(Math.round(timeToReturn.getMinutes() / 15) * 15);
    return timeToReturn;
  }

  // input control functions
  setStartTime = (event) => {
    let time = this.roundTimeQuarterHour(event);
    let timeMS = moment(time).valueOf();
    this.setState({ startTime: time, startTimeMS: timeMS });
  };

  setEndTime = (event) => {
    let time = this.roundTimeQuarterHour(event);
    let timeMS = moment(time).valueOf();
    if (timeMS < this.state.startTimeMS) {
      this.setState({ errorMsg: "End time cannot precede start time." });
      return;
    }
    this.setState({ endTime: time, errorMsg: "" });
  };

  setLocation = (event) => {
    this.setState({ location: event.target.value });
  };

  setClassId = (event) => {
    this.setState({ classId: event.target.value });
  };

  // open or close edit form page
  clickEdit = () => {
    this.setState({ isClick: !this.state.isClick, errorMsg: "" });
  };

  // render select class options
  renderClassDropdown = () => {
    let classesHTML = this.state.classes.map((element, index) => {
      return (
        <MenuItem value={element.id} key={index}>
          {element.title}
        </MenuItem>
      );
    });
    return (
      <FormControl fullWidth>
        <InputLabel>Select Class</InputLabel>
        <Select onChange={this.setClassId} value={this.state.classId} disabled>
          <MenuItem value="" disabled>
            Select Class
          </MenuItem>
          {classesHTML}
        </Select>
      </FormControl>
    );
  };

  render() {
    let selectClass = this.renderClassDropdown() || "";

    return (
      <div>
        <Button variant="contained" color="primary" onClick={this.clickEdit}>
          Edit
        </Button>
        <Dialog
          open={this.state.isClick}
          onClose={this.clickEdit}
          aria-labelledby="form-dialog-title"
          fullWidth
        >
          <div className="row">
            <div className="col-sm">
              <DialogTitle>Edit Session</DialogTitle>
              <DialogContent>
                <div className="text-danger">{this.state.errorMsg}</div>
                {/* select class; disabled for edit */}
                {selectClass}
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  {/* select date; is disabled permanently */}
                  <KeyboardDatePicker
                    disabled
                    fullWidth
                    variant="inline"
                    format="dd/MM/yyyy"
                    margin="normal"
                    label="Start Date"
                    value={this.state.date}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                  <div className="row">
                    <div className="col-sm">
                      {/* select start time */}
                      <KeyboardTimePicker
                        label="Start Time"
                        value={this.state.startTime}
                        onChange={this.setStartTime}
                        KeyboardButtonProps={{
                          "aria-label": "change time",
                        }}
                        required
                      />
                    </div>
                    <div className="col-sm">
                      {/* select end time */}
                      <KeyboardTimePicker
                        label="Time picker"
                        value={this.state.endTime}
                        onChange={this.setEndTime}
                        KeyboardButtonProps={{
                          "aria-label": "change time",
                        }}
                        required
                      />
                    </div>
                  </div>
                </MuiPickersUtilsProvider>
                {/* input location */}
                <TextField
                  margin="dense"
                  label="Location"
                  onChange={this.setLocation}
                  value={this.state.location}
                  fullWidth
                  required
                />
              </DialogContent>
            </div>
          </div>
          <DialogActions>
            <Button variant="contained" color="primary" onClick={this.submit}>
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
