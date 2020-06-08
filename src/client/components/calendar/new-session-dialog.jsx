import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker} from '@material-ui/pickers';

var moment = require('moment'); 

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  }

  const submitEdit = () => {
    setOpen(false);
    
  };

  // const [selectedDate, setSelectedDate] = React.useState(new Date(date));

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

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Add
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth>
        <div className="row">
          <div className="col-sm">
            <DialogTitle id="form-dialog-title">New Session</DialogTitle>
            <DialogContent>
              <TextField
                // autoFocus
                margin="dense"
                label="Name"
                // onChange={handleNameChange}
                // defaultValue={name}
                fullWidth
              />
              <TextField
                // autoFocus
                margin="dense"
                label="Description"
                // defaultValue={description}
                // onChange={handleDescriptionChange}
                fullWidth
              />
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  fullWidth
                  variant="inline"
                  format="dd/MM/yyyy"
                  margin="normal"
                  label="Date"
                  // value={selectedDate}
                  // onChange={handleDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date'
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
                        'aria-label': 'change time'
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
                        'aria-label': 'change time'
                      }}
                    />
                  </div>
                </div>
              </MuiPickersUtilsProvider>
            </DialogContent>
          </div>
        </div>
        <DialogActions>
          <Button  color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

// FormDialog.propTypes = {
//   name: PropTypes.string,
//   description: PropTypes.string,
//   date: PropTypes.string,
//   startTime: PropTypes.string,
//   endTime: PropTypes.string,
//   id: PropTypes.number
// };
