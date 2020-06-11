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
import EditStudent2 from "./edit-student2";

const useStyles = makeStyles({
  root: {
    maxWidth: 350,
  },
  media: {
    height: 350,
  },
});

export default function MediaCard({ student, isHidden, classesArr }) {
  const classes = useStyles();
  let name = "";
  let image = "";
  let notes = "";
  let bday = "";
  let gender = "";
  let classesHTML = "";

  if (student !== "") {
    bday = moment(student.birthday, "x").format("DD MMMM YYYY");
    name = student.name;
    image = student.image;
    notes = student.notes;
    gender = student.gender;
    classesHTML = student.classes.map((element, index) => {
      return <li key={index}>{element.title}</li>
    });
  }

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
          <div>
            Notes: {notes}
          </div>
          <div>
            Birthday: {bday}
          </div>
          <div>
            Gender: {gender}
          </div>
          <div>
            Class(es):
            <ul>
              {classesHTML}
            </ul>
          </div>
        </CardContent>
        <CardActions>
          <EditStudent2 classes={classesArr} student={student} />
          <Button size="small" color="primary">
            Delete
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}
