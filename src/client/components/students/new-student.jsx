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

export default function NewStudent() {
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


  return (
    <div>
      <button onClick={handleClickOpen}>Add New Student</button>
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
                  disabled
                  fullWidth
                  variant="inline"
                  format="dd/MM/yyyy"
                  margin="normal"
                  label="Start Date"
                  value={selectedDate}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
                <div className="row">
                  <div className="col-sm">
                    <KeyboardTimePicker
                      label="Start Time"
                      value={selectedStartTime}
                      onChange={selectStartDateTime}
                      KeyboardButtonProps={{
                        "aria-label": "change time",
                      }}
                    />
                  </div>
                  <div className="col-sm">
                    <KeyboardTimePicker
                      label="Time picker"
                      value={selectedEndTime}
                      onChange={selectEndDateTime}
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
                onChange={selectLocation}
                fullWidth
              />
              <div className="row">
                <div className="col-sm mt-3">
                  <FormControl fullWidth>
                    <InputLabel>Select Frequency</InputLabel>
                    <Select onChange={selectFreq}>
                      <MenuItem value="" disabled>
                        Select Frequency
                      </MenuItem>
                      <MenuItem value="1">Ad Hoc (i.e. once off)</MenuItem>
                      <MenuItem value="2">Daily</MenuItem>
                      <MenuItem value="3">Weekly</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div className="col-sm">
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      disableToolbar
                      fullWidth
                      variant="inline"
                      format="dd/MM/yyyy"
                      margin="normal"
                      label="Up Till"
                      value={upTillDateDisplay}
                      onChange={selectUpTill}
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </div>
              </div>
            </DialogContent>
          </div>
        </div>
        <DialogActions>
          <Button color="primary" onClick={submit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

FormDialog.propTypes = {
  classes: PropTypes.array,
  dateStr: PropTypes.string,
};
