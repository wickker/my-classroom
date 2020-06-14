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
import FileUpload from "./file-upload-instructor";

export default class NewInstructor extends React.Component {
  constructor() {
    super();
    this.state = {
      isClick: false,
      sessions: [],
      classes: [],
      name: "",
      image: "",
      about: "",
      email: "",
      password: "",
      checkedState: {},
      primaryCheckedState: {},
      errorMsg: "",
      instructors: [],
    };
  }

  componentDidUpdate = (prevProps) => {
    let classes = prevProps.classes;
    if (!isEqual(this.props.classes, prevProps.classes)) {
      classes = this.props.classes;
    }
    if (!isEqual(this.props.sessions, prevProps.sessions)) {
      let sessions = this.props.sessions;
      this.initCheckedState(sessions, classes);
      this.setState({
        sessions,
        classes,
        instructors: this.props.instructors,
      });
    }
  };

  // initialize objects to keep track of check box state
  initCheckedState = (sessions, classes) => {
    // for sessions of classes
    let obj = {};
    // for classes
    let primaryObj = {};
    for (let i = 0; i < classes.length; i++) {
      let classId = classes[i].id;
      obj[classId] = {};
      obj[classId]["og"] = {};
      obj[classId]["current"] = {};
      primaryObj[classId] = false;
      // find sessions that correspond to a particular class id
      let matchingSessions = sessions.filter((element) => {
        return element.class_id === classId;
      });
      // map sessions for a particular class id
      matchingSessions.forEach((element) => {
        obj[classId]["og"][element.id] = false;
        obj[classId]["current"][element.id] = false;
      });
    }
    this.setState({ checkedState: obj, primaryCheckedState: primaryObj });
  };

  // render checkboxes for classes and sessions
  renderCheckboxes = () => {
    if (this.state.classes.length > 0 && this.state.sessions.length > 0) {
      let classes = this.state.classes;
      let sessions = this.state.sessions;
      let checkedState = this.state.checkedState;
      let primaryCheckedState = this.state.primaryCheckedState;
      // map class selection
      let classChoices = classes.map((classEle, classIndex) => {
        // map sessions that correspond to class
        let matchingSessions = sessions.filter((element) => {
          return element.class_id === classEle.id;
        });
        // only if there are sessions that correspond to that class 
        if (matchingSessions.length > 0) {
          let seshChoices = matchingSessions.map((session, seshIndex) => {
            // hide the session selection if the corresponding class is not selected 
            let isHide;
            primaryCheckedState[classEle.id] === false
              ? (isHide = true)
              : (isHide = false);
            let date = moment(session.start_datetime, "x").format(
              "DD/MM/YY, hh:mmA"
            );
            return (
              // session checkboxes
              <span key={seshIndex} hidden={isHide}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="sessions"
                      color="primary"
                      id={classEle.id.toString()}
                      value={session.id}
                      onChange={this.setSessionCheck}
                      checked={checkedState[classEle.id]["current"][session.id]}
                    />
                  }
                  label={date}
                />
              </span>
            );
          });
          return (
            // class checkboxes
            <div key={classIndex}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="classes"
                    color="primary"
                    value={classEle.id}
                    onChange={this.setClassCheck}
                    checked={primaryCheckedState[classEle.id]}
                  />
                }
                label={classEle.title}
              />
              <div className="ml-3">{seshChoices}</div>
            </div>
          );
        }
      });
      return classChoices;
    }
  };

  submit = () => {
    let data = {
      name: this.state.name,
      image: this.state.image,
      about: this.state.about,
      email: this.state.email,
      password: this.state.password,
      checkedState: this.state.checkedState,
    }
    for (const key in data) {
      if (data[key] === "") {
        this.setState({ errorMsg: "Please complete all fields." });
        return;
      }
    }
    // post new instructor to server
    this.setState({ isClick: !this.state.isClick });
    let url = '/instructors/new';
    fetch(url, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        window.location.reload(false);
      })
      .catch((error) => {
        console.error('Error:', error);
        window.location.reload(false);
      });
  };

  setSessionCheck = (event) => {
    let value = parseInt(event.target.value);
    let boo = event.target.checked;
    let classId = parseInt(event.target.id);
    let obj = this.state.checkedState;
    obj[classId]["current"][value] = boo;
    this.setState({ checkedState: obj });
  };

  setClassCheck = (event) => {
    let value = event.target.value;
    let boo = event.target.checked;
    let obj = this.state.primaryCheckedState;
    obj[value] = boo;
    this.setState({ primaryCheckedState: obj });
  };

  setName = (event) => {
    this.setState({ name: event.target.value });
  };

  setAbout = (event) => {
    this.setState({ about: event.target.value });
  };

  setEmail = (event) => {
    let email = event.target.value;
    let found = this.state.instructors.find(element => element.email === email);
    if (!email.includes("@")) {
      this.setState({ errorMsg: "Please input a valid email." });
      return;
    }
    if (!!found) {
      this.setState({ errorMsg: "Email already exists. Please choose another one." });
      return;
    }
    this.setState({ email: email, errorMsg: "" });
  };

  setPassword = (event) => {
    this.setState({ password: event.target.value });
  };

  // gets image url from upload component
  callback = (result) => {
    console.log("callback: ", result);
    if (result.includes("https://")) {
      this.setState({ image: result, errorMsg: "" });
    } else {
      this.setState({ errorMsg: "Please input a valid URL." });
    }
  };

  // controls opening and closing of form
  clickEdit = () => {
    this.setState({ isClick: !this.state.isClick, errorMsg: ""  });
  };

  render() {
    return (
      <div>
        <Button variant="contained" color="primary" onClick={this.clickEdit}>
          Add New Instructor
        </Button>
        <Dialog
          open={this.state.isClick}
          onClose={this.clickEdit}
          aria-labelledby="form-dialog-title"
          fullWidth
        >
          <div className="row">
            <div className="col-sm">
              <DialogTitle>New Instructor</DialogTitle>
              <DialogContent>
              <div className="text-danger">{this.state.errorMsg}</div>
                <TextField
                  margin="dense"
                  label="Name"
                  onChange={this.setName}
                  fullWidth
                  required
                />
                <TextField
                  margin="dense"
                  label="About"
                  onChange={this.setAbout}
                  fullWidth
                  multiline
                  rows={2}
                  required
                />
                <TextField
                  margin="dense"
                  label="Email"
                  onChange={this.setEmail}
                  fullWidth
                  required
                />
                <TextField
                  margin="dense"
                  label="Password"
                  onChange={this.setPassword}
                  fullWidth
                  required
                />
                <div className="mt-4">Select Classes and Sessions</div>
                {/* checkboxes go here */}
                <div>{this.renderCheckboxes()}</div>
                <div className="mt-3 mb-3">
                  Select Image *
                  <FileUpload callback={this.callback} />
                </div>
              </DialogContent>
              <DialogActions>
                <Button
                  className="mr-3"
                  variant="contained"
                  color="primary"
                  onClick={this.submit}
                >
                  Submit
                </Button>
              </DialogActions>
            </div>
          </div>
        </Dialog>
      </div>
    );
  }
}
