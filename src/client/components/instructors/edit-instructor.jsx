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
import FileUploadEdit from "./file-upload-instructor-edit";

export default class EditInstructor extends React.Component {
  constructor() {
    super();
    this.state = {
      isClick: false,
      sessions: [],
      classes: [],
      id: "",
      name: "",
      image: "",
      about: "",
      email: "",
      password: "",
      checkedState: {},
      primaryCheckedState: {},
      instructor: {},
      errorMsg: "",
      instructors: [],
    };
  }

  componentDidMount = () => {
    this.setState({
      instructors: this.props.instructors,
      sessions: this.props.sessions,
      classes: this.props.classes,
      instructor: this.props.instructor,
      id: this.props.instructor.id,
      name: this.props.instructor.name,
      about: this.props.instructor.about,
      image: this.props.instructor.image,
      email: this.props.instructor.email,
    });

    this.initCheckedState();
  };

  initCheckedState = () => {
    let sessions = this.props.sessions;
    let classes = this.props.classes;
    let instructor = this.props.instructor;
    let obj = {};
    let primaryObj = {};
    // for each class available
    for (let i = 0; i < classes.length; i++) {
      let classId = classes[i].id;
      obj[classId] = {};
      obj[classId]["og"] = {};
      obj[classId]["current"] = {};
      // if class id is already associated with instructor, set primaryObj value as true
      let found;
      found = instructor.classes.find((element) => {
        return element.class_id === classId;
      });
      found ? (primaryObj[classId] = true) : (primaryObj[classId] = false);
      // generate all sessions per class
      let matchingSessions = sessions.filter((element) => {
        return element.class_id === classId;
      });
      // check if session already associated with instructor, if so, return true
      matchingSessions.forEach((element) => {
        let result;
        result = instructor.sessions.find((thing) => {
          return thing.session_id === element.id;
        });
        if (result) {
          obj[classId]["og"][element.id] = true;
          obj[classId]["current"][element.id] = true;
        } else {
          obj[classId]["og"][element.id] = false;
          obj[classId]["current"][element.id] = false;
        }
      });
    }
    this.setState({ checkedState: obj, primaryCheckedState: primaryObj });
  };

  renderCheckboxes = () => {
    if (this.state.classes.length > 0 && this.state.sessions.length > 0) {
      let classes = this.state.classes;
      let sessions = this.state.sessions;
      let checkedState = this.state.checkedState;
      let primaryCheckedState = this.state.primaryCheckedState;
      let classChoices = classes.map((classEle, classIndex) => {
        let matchingSessions = sessions.filter((element) => {
          return element.class_id === classEle.id;
        });
        if (matchingSessions.length > 0) {
          let seshChoices = matchingSessions.map((session, seshIndex) => {
            let isHide;
            primaryCheckedState[classEle.id] === false
              ? (isHide = true)
              : (isHide = false);
            let date = moment(session.start_datetime, "x").format(
              "DD/MM/YY, hh:mmA"
            );
            return (
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
      id: this.state.id,
      name: this.state.name,
      image: this.state.image,
      about: this.state.about,
      checkedState: this.state.checkedState,
      email: this.state.email,
      password: this.state.password,
    };
    for (const key in data) {
      if (data[key] === "") {
        this.setState({ errorMsg: "Please complete all fields." });
        return;
      }
    }
    // post data to server
    this.setState({ isClick: !this.state.isClick });
    let url = "/instructors/edit";
    fetch(url, {
      method: "POST", // or 'PUT'
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
    let found = this.props.instructors.find(element => element.email === email);
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

  callback = (result) => {
    console.log("callback: ", result);
    if (result.includes("https://")) {
      this.setState({ image: result, errorMsg: "" });
    } else {
      this.setState({ errorMsg: "Please input a valid URL." });
    }
  };

  clickEdit = () => {
    this.setState({ isClick: !this.state.isClick, errorMsg: "" });
  };

  render() {
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
              <DialogTitle>New Instructor</DialogTitle>
              <DialogContent>
                <div className="text-danger">{this.state.errorMsg}</div>
                <TextField
                  margin="dense"
                  label="Name"
                  onChange={this.setName}
                  defaultValue={this.state.name}
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
                  defaultValue={this.state.about}
                  required
                />
                <TextField
                  margin="dense"
                  label="Name"
                  onChange={this.setEmail}
                  defaultValue={this.state.email}
                  fullWidth
                  required
                />
                <TextField
                  margin="dense"
                  label="New Password"
                  onChange={this.setPassword}
                  fullWidth
                  required
                />
                <div className="mt-4">Select Classes and Sessions</div>
                {/* checkboxes go here */}
                <div>{this.renderCheckboxes()}</div>
                <div className="mt-3 mb-3">
                  Select Image *
                  <FileUploadEdit
                    callback={this.callback}
                    image={this.state.image}
                  />
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
