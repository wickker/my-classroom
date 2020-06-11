import React, { useState, useEffect } from "react";
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
import FileUploadEdit from "./file-upload-stu-edit";

export default function EditStudent({ classes, student }) {
  console.log(student);
  const [open, setOpen] = useState(false);
  const [birthday, setBirthday] = useState("");
  const [checkClasses, setCheckClasses] = useState([]);
  const [name, setName] = useState(student.name);
  const [gender, setGender] = useState("");
  const [notes, setNotes] = useState("");
  const [file, setFile] = useState("");

  useEffect(() => {
    console.log("effect happened");
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const submit = () => {
    setOpen(false);
    let data = {
      name,
      birthday,
      checkClasses,
      gender,
      notes,
      file,
    };
    console.log(data);

    // let url = '/students/post';
    // fetch(url, {
    //   method: 'POST', // or 'PUT'
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(data)
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log('Success:', data);
    //     window.location.reload(false);

    //   })
    //   .catch((error) => {
    //     console.error('Error:', error);
    //     window.location.reload(false);

    //   });
  };

  const birthdaySet = (event) => {
    let bday = moment(event).valueOf();
    console.log(bday);
    setBirthday(bday);
  };

  const nameSet = (event) => {
    console.log(event.target.value);
    setName(event.target.value);
  };

  // const onCheckChanged = (event) => {
  //   console.log(event.target.value);
  //   console.log(event.target.checked);
  //   if (event.target.checked) {
  //     checkClasses.push(event.target.value);
  //     setCheckClasses(checkClasses);
  //   }
  // };

  const genderSet = (event) => {
    console.log(event.target.value);
    let gender;
    event.target.value === 1 ? (gender = "Male") : (gender = "Female");
    console.log(gender);
    setGender(gender);
  };

  const notesSet = (event) => {
    setNotes(event.target.value);
  };

  const callback = (string) => {
    console.log("STRING: ", string);
    setFile(string);
  };

  // const renderSelectClass = () => {
  //   if (classes.length > 0 && student !== "") {
  //     // get array of class ids student is already enrolled in
  //     let arr = [];
  //     for (let i = 0; i < student.classes.length; i++) {
  //       arr.push(student.classes[i].class_id);
  //     }

  //     let HTML = classes.map((element, index) => {
  //       let isChecked = false;
  //       if (arr.includes(element.id)) {
  //         isChecked = true;
  //       }
  //       return (
  //         <span key={index}>
  //           <FormControlLabel
  //             control={
  //               <Checkbox
  //                 name="classes"
  //                 checked={isChecked}
  //                 color="primary"
  //                 value={element.id}
  //                 onChange={onCheckChanged}
  //               />
  //             }
  //             label={element.title}
  //           />
  //         </span>
  //       );
  //     });
  //     return HTML;
  //   }
  // };

  const initClasses = () => {
    if (classes.length > 0 && student !== "") {
      let newClassesState = [];
      // get array of class ids student is already enrolled in
      let arr = [];
      for (let i = 0; i < student.classes.length; i++) {
        arr.push(student.classes[i].class_id);
      }

      classes.forEach((element) => {
        let isChecked = false;
        if (arr.includes(element.id)) {
          isChecked = true;
        }
        newClassesState.push({
          id: element.id,
          title: element.title,
          checked: isChecked,
        });
      });
      console.log(newClassesState);
      return newClassesState;
    }
  };

  const [classesState, setClassesState] = useState(initClasses());
  const renderSelectClass = () => {
    console.log('classesState: ', classesState);
    if (classesState && classesState.length > 0 && student !== "") {
      // get array of class ids student is already enrolled in

      let HTML = classesState.map((element, index) => {
        return (
          <span key={index}>
            <FormControlLabel
              control={
                <Checkbox
                  name="classes"
                  checked={element.checked}
                  color="primary"
                  value={element.id}
                  onChange={onCheckChanged}
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
  const onCheckChanged = (event) => {
    const findClass = (element) => {
      return element.id === event.target.value;
    };
    const targetClass = classesState.findIndex(findClass);
    const newClassesState = {
      ...classesState[targetClass],
      checked: !classesState[targetClass].checked,
    };
    setClassesState(newClassesState);
  };
  let checkboxes = renderSelectClass() || "";

  let ogName = student.name || "";
  let ogBday = moment(student.birthday, "x").format() || "";

  let ogGender;
  student.gender === "Male" ? (ogGender = 1) : (ogGender = 2);

  let ogNotes = student.notes || "";
  let ogImage = student.image || "";

  return (
    <div>
      <Button size="small" color="primary" onClick={handleClickOpen}>
        Edit
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth
      >
        <div className="row">
          <div className="col-sm">
            <DialogTitle>Edit Student</DialogTitle>
            <DialogContent>
              <TextField
                margin="dense"
                label="Name"
                onChange={nameSet}
                fullWidth
                defaultValue={ogName}
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
                      value={ogBday}
                      onChange={birthdaySet}
                    />
                  </MuiPickersUtilsProvider>
                </div>
                <div className="col-sm mt-3">
                  <FormControl fullWidth>
                    <InputLabel>Select Gender</InputLabel>
                    <Select defaultValue={ogGender} onChange={genderSet}>
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
                    defaultValue={ogNotes}
                  />
                </div>
                <div className="col-sm">
                  Upload/ Input Display Picture
                  <FileUploadEdit callback={callback} ogImage={ogImage} />
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
