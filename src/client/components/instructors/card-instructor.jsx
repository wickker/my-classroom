import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
var moment = require("moment");
import styles from "./instructors.scss";
import EditInstructor from "./edit-instructor";

const useStyles = makeStyles({
  root: {
    maxWidth: 250,
  },
  media: {
    height: 250,
  },
});

export default function MediaCard({ instructor, classesArr, sessions, hide }) {
  const classes = useStyles();

  const deleteInstructor = () => {
    console.log(instructor.id);
    let data = {
      id: instructor.id,
    }
    alert("Confirm delete?");
    // log the instructor out
    localStorage.removeItem("banana");
    // send request to server
    let url = '/instructors/delete';
    fetch(url, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        window.location.reload(false);
      })
      .catch((error) => {
        console.error('Error:', error);
        window.location.reload(false);
      });
  };

  let classesHTML;
  if (instructor.classes.length > 0) {
    classesHTML = instructor.classes.map((element, classIndex) => {
      return <li key={classIndex}>{element.title}</li>;
    });
  } else {
    classesHTML = (
      <li>No class assigned yet.</li>
    );
  }
  

  return (
    <div className={styles.card}>
      <Card className={classes.root}>
        <CardMedia
          className={classes.media}
          image={instructor.image}
          alt="instructor display picture"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {instructor.name}
          </Typography>
          <div>About: {instructor.about}</div>
          <div>
            Classes:
            <ul>{classesHTML}</ul>
          </div>
        </CardContent>
        <div hidden={hide}>
        <CardActions>

          <EditInstructor
            instructor={instructor}
            classes={classesArr}
            sessions={sessions}
          />

          <Button
            variant="contained"
            color="primary"
            onClick={deleteInstructor}
          >
            Delete
          </Button>
        </CardActions>
        </div>
      </Card>
    </div>
  );
}
