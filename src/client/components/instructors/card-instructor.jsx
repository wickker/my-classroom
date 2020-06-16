import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
var moment = require("moment");
import styles from "../all_styles.scss";
import EditInstructor from "./edit-instructor";
var classNames = require("classnames");
const cx = classNames.bind(styles);

const useStyles = makeStyles({
  root: {
    maxWidth: 250,
  },
  media: {
    height: 250,
  },
});

export default function MediaCard({
  instructor,
  classesArr,
  sessions,
  hide,
  instructors,
}) {
  const classes = useStyles();

  const deleteInstructor = () => {
   
    let data = {
      id: instructor.id,
    };
    // log the instructor out
    localStorage.removeItem("banana");
    // send request to server
    let url = "/instructors/delete";
    fetch(url, {
      method: "POST", // or 'PUT'
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

  let classesHTML;
  if (instructor.classes.length > 0) {
    classesHTML = instructor.classes.map((element, classIndex) => {
      return <li key={classIndex}>{element.title}</li>;
    });
  } else {
    classesHTML = <li>No class assigned yet.</li>;
  }

  const card = cx(styles.card2, "h-100", "card");

  return (
    <div className={card}>
      <CardMedia
        className={classes.media}
        image={instructor.image}
        alt="instructor display picture"
      />
      <CardContent>
        <div className={styles.card_title}>{instructor.name}</div>
        <div className={styles.card_text}>
          <div className="mt-3">
            <b>About: </b>
            {instructor.about}
          </div>
          <div className="mt-3">
            <b>Classes:</b>
            <ul>{classesHTML}</ul>
          </div>
        </div>
      </CardContent>
      <div hidden={hide}>
        <CardActions>
          <EditInstructor
            instructor={instructor}
            classes={classesArr}
            sessions={sessions}
            instructors={instructors}
          />
          <button className={styles.button} onClick={deleteInstructor}>
            Delete
          </button>
        </CardActions>
      </div>
    </div>
  );
}
