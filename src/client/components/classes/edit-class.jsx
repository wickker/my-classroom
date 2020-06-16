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
import styles from "../all_styles.scss";

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
      errorMsg: "",
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
    let data = {
      id: this.state.id,
      title: this.state.title,
      description: this.state.description,
      frequency: this.state.frequency,
      image: this.state.image,
      color: this.state.color,
    };
    // validation
    for (const key in data) {
      if (data[key] === "") {
        this.setState({ errorMsg: "Please complete all fields." });
        return;
      }
    }
    this.setState({ isClick: !this.state.isClick });
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
              <DialogContent>
                <div className={styles.form_title}>Edit Class</div>
                <div className={styles.error}>{this.state.errorMsg}</div>
                <TextField
                  margin="dense"
                  label="Name"
                  onChange={this.setTitle}
                  defaultValue={this.state.title}
                  fullWidth
                  required
                  InputProps={{
                    style: {
                      fontFamily: "Quicksand",
                      letterSpacing: "1px",
                    },
                  }}
                />
                <TextField
                  margin="dense"
                  label="Description"
                  onChange={this.setDescription}
                  fullWidth
                  multiline
                  rows={2}
                  defaultValue={this.state.description}
                  required
                  InputProps={{
                    style: {
                      fontFamily: "Quicksand",
                      letterSpacing: "1px",
                    },
                  }}
                />
                <TextField
                  margin="dense"
                  label="Frequency"
                  onChange={this.setFrequency}
                  defaultValue={this.state.frequency}
                  fullWidth
                  required
                  InputProps={{
                    style: {
                      fontFamily: "Quicksand",
                      letterSpacing: "1px",
                    },
                  }}
                />
                <div className="mt-2 mb-2">
                  <span className={styles.input_field}>
                    Color Display On Calendar *
                  </span>
                  <input
                    className="form-control"
                    type="color"
                    onChange={this.setColor}
                    width="100%"
                    defaultValue={this.state.color}
                  />
                </div>
                <div className="mt-3">
                  <span className={styles.input_field}>Select Image *</span>
                  <FileUploadEdit
                    callback={this.callback}
                    image={this.state.image}
                  />
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
