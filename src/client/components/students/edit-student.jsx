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
import FileUploadEdit from "./file-upload-student-edit";
import styles from "../all_styles.scss";

// main class begins here
export default class EditStudent extends React.Component {
  constructor() {
    super();
    this.state = {
      classes: [],
      classesWSessions: [],
      student: {},
      isClick: false,
      checkboxesState: {},
      id: "",
      name: "",
      birthday: "",
      gender: "",
      notes: "",
      image: "",
      errorMsg: "",
    };
  }

  componentDidUpdate = (prevProps) => {
    let classes = prevProps.classes;
    if (!isEqual(this.props.classes, prevProps.classes)) {
      classes = this.props.classes;
    }
    if (!isEqual(this.props.student, prevProps.student)) {
      let student = this.props.student;
      let classesWSessions = classes.filter((element) => {
        return element.sessions.length > 0;
      });
      this.initCheckboxState(classesWSessions, student);
      let g;
      student.gender === "Male" ? (g = 1) : (g = 2);
      this.setState({
        classes: classes,
        classesWSessions: classesWSessions,
        student: student,
        id: student.id,
        name: student.name,
        birthday: moment(student.birthday, "x").format(),
        gender: g,
        notes: student.notes,
        image: student.image,
      });
    }
  };

  submit = () => {
    let data = {
      id: this.state.id,
      name: this.state.name,
      birthday: moment(this.state.birthday).valueOf(),
      classesCheck: this.state.checkboxesState,
      gender: this.state.gender,
      notes: this.state.notes,
      image: this.state.image,
    };
    // validation
    for (const key in data) {
      if (data[key] === "") {
        this.setState({ errorMsg: "Please complete all fields." });
        return;
      }
    }
    this.setState({ isClick: !this.state.isClick });
    let url = "/students/edit";
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

  // form handlers
  setName = (event) => {
    this.setState({ name: event.target.value });
  };

  setCheck = (event) => {
    let value = event.target.value;
    let checkboxesState = this.state.checkboxesState;
    checkboxesState[value].current = !checkboxesState[value].current;
    this.setState({ checkboxesState });
  };

  setBirthday = (value) => {
    this.setState({ birthday: value });
  };

  setGender = (event) => {
    this.setState({ gender: event.target.value });
  };

  setNotes = (event) => {
    this.setState({ notes: event.target.value });
  };

  callback = (result) => {
    if (result.includes("https://")) {
      this.setState({ image: result, errorMsg: "" });
    } else {
      this.setState({ errorMsg: "Please input a valid URL." });
    }
  };

  initCheckboxState = (classes, student) => {
    // get array of class ids student is already enrolled in
    let array = [];
    for (let i = 0; i < student.classes.length; i++) {
      array.push(student.classes[i].class_id);
    }
    // map checkboxes state object
    let checkboxesState = {};
    classes.forEach((element) => {
      checkboxesState[element.id] = {};
      if (array.includes(element.id)) {
        checkboxesState[element.id].og = true;
        checkboxesState[element.id].current = true;
      } else {
        checkboxesState[element.id].og = false;
        checkboxesState[element.id].current = false;
      }
    });
    this.setState({ checkboxesState });
  };

  renderCheckboxes = () => {
    if (this.state.classesWSessions.length > 0) {
      let classes = this.state.classesWSessions;
      let HTML = classes.map((element, index) => {
        let checkboxesState = this.state.checkboxesState;
        return (
          <span key={index}>
            <FormControlLabel
              control={
                <Checkbox
                  name="classes"
                  checked={checkboxesState[element.id].current}
                  color="primary"
                  value={element.id}
                  onChange={this.setCheck}
                />
              }
              label={element.title}
            />
          </span>
        );
      });
      return HTML;
    }
  };

  clickEdit = () => {
    this.setState({ isClick: !this.state.isClick, errorMsg: "" });
  };

  render() {
    return (
      <div>
        <button className={styles.button} onClick={this.clickEdit}>
          Edit
        </button>
        <Dialog
          open={this.state.isClick}
          onClose={this.clickEdit}
          aria-labelledby="form-dialog-title"
          fullWidth
        >
          <div className="row">
            <div className="col-sm">
              <DialogTitle>Edit Student</DialogTitle>
              <DialogContent>
                <div className="text-danger">{this.state.errorMsg}</div>
                <TextField
                  margin="dense"
                  label="Name"
                  onChange={this.setName}
                  fullWidth
                  defaultValue={this.state.name}
                  required
                  InputProps={{
                    style: {
                      fontFamily: "Quicksand",
                      letterSpacing: "1px",
                    },
                  }}
                />
                {/* checkboxes go here */}
                <div className="mt-3">
                  <span className={styles.input_field}>Select Classes</span>
                </div>
                {this.renderCheckboxes()}
                <div className="row mb-3">
                  <div className="col-sm">
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        fullWidth
                        variant="inline"
                        format="dd/MM/yyyy"
                        margin="normal"
                        label="Birthday"
                        value={this.state.birthday}
                        onChange={this.setBirthday}
                        required
                        InputProps={{
                          style: {
                            fontFamily: "Quicksand",
                            letterSpacing: "1px",
                          },
                        }}
                      />
                    </MuiPickersUtilsProvider>
                  </div>
                  <div className="col-sm mt-3">
                    <FormControl fullWidth>
                      <InputLabel>Select Gender *</InputLabel>
                      <Select
                        defaultValue={this.state.gender}
                        onChange={this.setGender}
                        style={{
                          fontFamily: "Quicksand",
                          letterSpacing: "1px",
                        }}
                      >
                        <MenuItem
                          style={{
                            fontFamily: "Quicksand",
                            letterSpacing: "1px",
                          }}
                          value=""
                          disabled
                        >
                          Select Gender
                        </MenuItem>
                        <MenuItem
                          style={{
                            fontFamily: "Quicksand",
                            letterSpacing: "1px",
                          }}
                          value="1"
                        >
                          Male
                        </MenuItem>
                        <MenuItem
                          style={{
                            fontFamily: "Quicksand",
                            letterSpacing: "1px",
                          }}
                          value="2"
                        >
                          Female
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </div>
                <div className="row mb-2">
                  <div className="col-sm">
                    <TextField
                      margin="dense"
                      label="Notes"
                      multiline
                      rows={2}
                      fullWidth
                      onChange={this.setNotes}
                      defaultValue={this.state.notes}
                      required
                      InputProps={{
                        style: {
                          fontFamily: "Quicksand",
                          letterSpacing: "1px",
                        },
                      }}
                    />
                  </div>
                  <div className="col-sm">
                    <span className={styles.input_field}>Select Image *</span>
                    <FileUploadEdit
                      callback={this.callback}
                      ogImage={this.state.image}
                    />
                  </div>
                </div>
              </DialogContent>
            </div>
          </div>
          <DialogActions>
            <div className="mr-3">
              <button className={styles.button} onClick={this.submit}>
                Submit
              </button>
            </div>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
