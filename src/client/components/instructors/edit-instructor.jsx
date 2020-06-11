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

export default class EditInstructor extends React.Component {
  constructor() {
    super();
    this.state = {
      isClick: false,
      sessions: [],
      classes: [],
      name: "",
      image: "",
      about: "",
      checkedState: {},
      primaryCheckedState: {},
      instructor: {},
    };
  }

  componentDidMount = () => {
    console.log("EDIT COMPONENT MOUNT~~~~~~~~");
    console.log(this.props.sessions);
    console.log(this.props.classes);
    console.log(this.props.instructor);

    this.setState({
      sessions: this.props.sessions,
      classes: this.props.classes,
      instructor: this.props.instructor,
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
    console.log("obj edit: ", obj);
    console.log("primary obj edit: ", primaryObj);

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
                      id={classEle.id}
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
    this.setState({ isClick: !this.state.isClick });

    let data = {
      name: this.state.name,
      image: this.state.image,
      about: this.state.about,
      checkedState: this.state.checkedState,
    };
    console.log(data);

    let url = "/instructors/new";
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
    console.log(event.target.value);
    console.log(event.target.id);
    console.log(event.target.checked);
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
    console.log(event.target.value);
    this.setState({ name: event.target.value });
  };

  setAbout = (event) => {
    console.log(event.target.value);
    this.setState({ about: event.target.value });
  };

  callback = (result) => {
    console.log("callback: ", result);
    this.setState({ image: result });
  };

  clickEdit = () => {
    this.setState({ isClick: !this.state.isClick });
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
                <TextField
                  margin="dense"
                  label="Name"
                  onChange={this.setName}
                  fullWidth
                />
                <TextField
                  margin="dense"
                  label="About"
                  onChange={this.setAbout}
                  fullWidth
                  multiline
                  rows={2}
                />
                <div className="mt-4">Select Classes and Sessions</div>
                <div>{this.renderCheckboxes()}</div>

                <div className="mt-3 mb-3">
                  Select Image
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
