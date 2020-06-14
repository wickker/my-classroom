import React from "react";
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
import FileUpload from "./file-upload-student";

// main function starts here
export default function NewStudent({ classes }) {
  // handles open and close of form dialog
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setErrorMsg("");
  };

  // define variables
  let date = moment(new Date()).valueOf();
  const [birthday, setBirthday] = React.useState(date);
  const [checkClasses, setCheckClasses] = React.useState([]);
  const [name, setName] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [notes, setNotes] = React.useState("");
  const [file, setFile] = React.useState("");
  const [errorMsg, setErrorMsg] = React.useState("");

  // post new student
  const submit = () => {
    let data = {
      name,
      birthday,
      checkClasses,
      gender,
      notes,
      file,
    };
    for (const key in data) {
      if (data[key] === "") {
        setErrorMsg("Please complete all fields.");
        return;
      }
    }
    setOpen(false);
    let url = "/students/post";
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
  const birthdaySet = (event) => {
    let bday = moment(event).valueOf();
    setBirthday(bday);
  };

  const nameSet = (event) => {
    setName(event.target.value);
  };

  const onCheckChanged = (event) => {
    if (event.target.checked) {
      checkClasses.push(event.target.value);
      setCheckClasses(checkClasses);
    }
  };

  const genderSet = (event) => {
    let gender;
    event.target.value === 1 ? (gender = "Male") : (gender = "Female");
    console.log(gender);
    setGender(gender);
  };

  const notesSet = (event) => {
    setNotes(event.target.value);
  };

  const callback = (string) => {
    if (string.includes("https://")) {
      setFile(string);
      setErrorMsg("");
    } else {
      setErrorMsg("Please input a valid URL.");
    }
  };

  // render class checkboxes
  const renderSelectClass = () => {
    if (classes && classes.length > 0) {
      let HTML = classes.map((element, index) => {
        if (element.sessions.length > 0) {
          return (
            <span key={index}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="classes"
                    color="primary"
                    value={element.id}
                    onChange={onCheckChanged}
                  />
                }
                label={element.title}
              />
            </span>
          );
        }
      });
      return HTML;
    }
  };

  let checkboxes = renderSelectClass() || "";

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Add New Student
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth
      >
        <div className="row">
          <div className="col-sm">
            <DialogTitle>New Student</DialogTitle>
            <DialogContent>
              <div className="text-danger">{errorMsg}</div>
              <TextField
                margin="dense"
                label="Name"
                onChange={nameSet}
                fullWidth
                required
              />
              <div className="mt-3">Select Classes</div>
              {checkboxes}
              <div className="row mb-3">
                <div className="col-sm">
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      fullWidth
                      variant="inline"
                      format="dd/MM/yyyy"
                      margin="normal"
                      label="Birthday"
                      value={birthday}
                      onChange={birthdaySet}
                      required
                    />
                  </MuiPickersUtilsProvider>
                </div>
                <div className="col-sm mt-3">
                  <FormControl fullWidth>
                    <InputLabel>Select Gender *</InputLabel>
                    <Select defaultValue="" onChange={genderSet}>
                      <MenuItem value="" disabled>
                        Select Gender
                      </MenuItem>
                      <MenuItem value="1">Male</MenuItem>
                      <MenuItem value="2">Female</MenuItem>
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
                    onChange={notesSet}
                    required
                  />
                </div>
                <div className="col-sm">
                  Select Image *
                  <FileUpload callback={callback} />
                </div>
              </div>
            </DialogContent>
          </div>
        </div>
        <DialogActions>
          <Button variant="contained" color="primary" onClick={submit}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
