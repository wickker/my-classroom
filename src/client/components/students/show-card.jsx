import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
var moment = require("moment");
import styles from "./students.scss";
import EditStudent from "./edit-student";
import { get, isEmpty } from "lodash";

// styles
const useStyles = makeStyles({
  root: {
    maxWidth: 350,
  },
  media: {
    height: 350,
  },
});

// main function starts here
export default function MediaCard({ student, isHidden, classesArr, hide }) {
  // styles
  const classes = useStyles();

  // define variables
  let name = get(student, "name") || "";
  let image = get(student, "image") || "";
  let notes = get(student, "notes") || "";
  let birth_date = get(student, "birthday") || "";
  let bday = moment(birth_date, "x").format("DD MMMM YYYY");
  let gender = get(student, "gender") || "";
  let id = get(student, "id") || "";
  let stuClasses = get(student, "classes") || [];
  let classesHTML = stuClasses.map((element, index) => {
    return <li key={index}>{element.title}</li>;
  });

  // delete student
  const deleteStudent = () => {
    console.log(id);
    let data = {
      id: id,
    };
    // post student id to server
    let url = "/students/delete";
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

  return (
    <div className={styles.card} hidden={isHidden}>
      <Card className={classes.root}>
        <CardMedia
          className={classes.media}
          image={image}
          alt="display picture"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
          <div>Notes: {notes}</div>
          <div>Birthday: {bday}</div>
          <div>Gender: {gender}</div>
          <div>
            Class(es):
            <ul>{classesHTML}</ul>
          </div>
        </CardContent>
        <div hidden={hide}>
          <CardActions>
            <EditStudent classes={classesArr} student={student} />
            <Button variant="contained" color="primary" onClick={deleteStudent}>
              Delete
            </Button>
          </CardActions>
        </div>
      </Card>
    </div>
  );
}
