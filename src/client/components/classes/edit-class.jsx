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
import FileUploadEdit from "./file-upload-class-edit";

export default class EditClass extends React.Component {
  constructor() {
    super();
    this.state = {
      isClick: false,
      image: "",
      title: "",
      description: "",
      frequency: "",
      id: "",
      color: "",
    };
  }

  componentDidMount = () => {
    let classCard = this.props.classCard;
    this.setState({
      image: classCard.image,
      title: classCard.title,
      description: classCard.description,
      frequency: classCard.frequency,
      id: classCard.id,
      color: classCard.color,
    });
  };

  submit = () => {
    this.setState({ isClick: !this.state.isClick });
    let data = {
      id: this.state.id,
      title: this.state.title,
      description: this.state.description,
      frequency: this.state.frequency,
      image: this.state.image,
      color: this.state.color,
    };
    let url = "/classes/edit";
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

  setTitle = (event) => {
    this.setState({ title: event.target.value });
  };

  setDescription = (event) => {
    this.setState({ description: event.target.value });
  };

  setFrequency = (event) => {
    this.setState({ frequency: event.target.value });
  };

  setColor = (event) => {
    this.setState({ color: event.target.value });
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
              <DialogTitle>Edit Class</DialogTitle>
              <DialogContent>
                <TextField
                  margin="dense"
                  label="Name"
                  onChange={this.setTitle}
                  defaultValue={this.state.title}
                  fullWidth
                />
                <TextField
                  margin="dense"
                  label="Description"
                  onChange={this.setDescription}
                  fullWidth
                  multiline
                  rows={2}
                  defaultValue={this.state.description}
                />
                <TextField
                  margin="dense"
                  label="Frequency"
                  onChange={this.setFrequency}
                  defaultValue={this.state.frequency}
                  fullWidth
                />
                Color Display On Calendar
                <input 
                className="form-control"
                type="color"
                onChange={this.setColor}
                width="100%"
                defaultValue={this.state.color}
                />
                <div className="mt-3 mb-3">
                  Select Image
                  <FileUploadEdit
                    callback={this.callback}
                    image={this.state.image}
                  />
                </div>
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
