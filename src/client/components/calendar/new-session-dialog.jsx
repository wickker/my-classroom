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

var moment = require("moment");

export default function FormDialog({ classes, dateStr }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const submit = () => {
    setOpen(false);
  };

  let dateFormatted = moment(dateStr, "D-M-YYYY").format();
  const [selectedDate, setSelectedDate] = React.useState(dateFormatted);

  // const [selectedStartTime, setSelectedStartTime] = React.useState(new Date(startTime));

  // const [selectedEndTime, setSelectedEndTime] = React.useState(new Date(endTime));

  // const [selectedName, setSelectedName] = React.useState(name);

  // const [selectedDescription, setSelectedDescription] = React.useState(description);

  // const handleDateChange = (date) => {
  //   setSelectedDate(date);
  // };

  // const handleStartTimeChange = (startTime) => {
  //   setSelectedStartTime(startTime);
  // };

  // const handleEndTimeChange = (endTime) => {
  //   setSelectedEndTime(endTime);
  // };

  // const handleNameChange = (event) => {
  //   console.log(event.target.value);
  //   setSelectedName(event.target.value);
  // };

  // const handleDescriptionChange = (event) => {
  //   console.log(event.target.value);
  //   setSelectedDescription(event.target.value);
  // };

  const renderClassDropdown = () => {
    let classesHTML = classes.map((element, index) => {
      return <MenuItem value={element.id} key={index}>{element.title}</MenuItem>;
    });
    return (
      <FormControl fullWidth>
        <InputLabel>Select Class</InputLabel>
        <Select onChange="">
          <MenuItem value="">Select Class</MenuItem>
          {classesHTML}
        </Select>
      </FormControl>
    );
  };

  let selectClass = renderClassDropdown();

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Add
      </Button>
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
                  disableToolbar
                  fullWidth
                  variant="inline"
                  format="dd/MM/yyyy"
                  margin="normal"
                  label="Date"
                  value={selectedDate}
                  onChange=""
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
                <div className="row">
                  <div className="col-sm">
                    <KeyboardTimePicker
                      // margin="normal"
                      label="Time picker"
                      // value={selectedStartTime}
                      // onChange={handleStartTimeChange}
                      KeyboardButtonProps={{
                        "aria-label": "change time",
                      }}
                    />
                  </div>
                  <div className="col-sm">
                    <KeyboardTimePicker
                      // margin="normal"
                      label="Time picker"
                      // value={selectedEndTime}
                      // onChange={handleEndTimeChange}
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
                onChange=""
                fullWidth
              />
            </DialogContent>
          </div>
        </div>
        <DialogActions>
          <Button color="primary">Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

FormDialog.propTypes = {
  classes: PropTypes.array,
  dateStr: PropTypes.string,

  // id: PropTypes.number
};
