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
      endTime: "",
      location: "",
    };
  }

  componentDidUpdate = (prevProps) => {
    if ( prevProps === this.props) {
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
      date: moment(startDate, "x").format(),
      startTime: moment(startDate, "x").format(),
      endTime: moment(endDate, "x").format(),
      location: get(obj, "session.location") || "",
    });
  };

  submit = () => {
    this.setState({ isClick: !this.state.isClick });

    // let data = {
    //   id: this.state.id,
    //   title: this.state.title,
    //   description: this.state.description,
    //   frequency: this.state.frequency,
    //   image: this.state.image,
    // };
    // console.log(data);

    // let url = "/classes/edit";
    // fetch(url, {
    //   method: "POST", // or 'PUT'
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(data),
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log("Success:", data);
    //     window.location.reload(false);
    //   })
    //   .catch((error) => {
    //     console.error("Error:", error);
    //     window.location.reload(false);
    //   });
  };

  setStartTime = (event) => {

  }

  setStartTime = (event) => {

  }

  setLocation = (event) => {

  }

  setClassId = (event) => {

  }

  clickEdit = () => {
    this.setState({ isClick: !this.state.isClick });
  };

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
        <Select onChange={this.setClassId} defaultValue={this.state.classId}>
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

              {selectClass}

              <MuiPickersUtilsProvider utils={DateFnsUtils}>
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
                    <KeyboardTimePicker
                      label="Start Time"
                      value={this.state.startTime}
                      onChange={this.setStartTime}
                      KeyboardButtonProps={{
                        "aria-label": "change time",
                      }}
                    />
                  </div>
                  <div className="col-sm">
                    <KeyboardTimePicker
                      label="Time picker"
                      value={this.state.endTime}
                      onChange={this.setEndTime}
                      KeyboardButtonProps={{
                        "aria-label": "change time",
                      }}
                    />
                  </div>
                </div>
              </MuiPickersUtilsProvider>
              
              <TextField
                margin="dense"
                label="Location"
                onChange={this.setLocation}
                value={this.state.location}
                fullWidth
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
