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
import EditClass from "./edit-class";
import { get } from "lodash";
var classNames = require("classnames");
const cx = classNames.bind(styles);

// styles
const useStyles = makeStyles({
  root: {
    maxWidth: 250,
  },
  media: {
    height: 250,
  },
});

// main function begins here
export default function MediaCard({ classCard, hide }) {
  const classes = useStyles();

  // declare variables
  let title = get(classCard, "title") || "";
  let description = get(classCard, "description") || "";
  let frequency = get(classCard, "frequency") || "";
  let image = get(classCard, "image") || "";
  let id = get(classCard, "id") || "";
  let instructors = get(classCard, "instructors") || [];

  // delete class function
  const deleteClass = () => {
    let data = {
      id: id,
    };
    let url = "/classes/delete";
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

  // render instructors list to display
  let instructorsHTML;
  if (instructors.length > 0) {
    instructorsHTML = instructors.map((element, index) => {
      return <li key={index}>{element.name}</li>;
    });
  } else {
    instructorsHTML = <li>No instructor assigned yet.</li>;
  }

  const card = cx(styles.card2, "h-100", "card");

  return (
    <div className={card}>
      {/* card image goes here */}
      <CardMedia className={classes.media} image={image} alt="class picture" />
      {/* main card content goes here */}
      <CardContent>
      <div className={styles.card_title}>{title}</div>
        <div className={styles.card_text}>
          <div className="mt-3">
            <b>Description: </b>
            {description}
          </div>
          <div className="mt-3">
            <b>Frequency: </b>
            {frequency}
          </div>
          <div className="mt-3">
            <b>Instructors:</b>
            <ul>{instructorsHTML}</ul>
          </div>
        </div>
      </CardContent>
      {/* edit and delete buttons */}
      <div hidden={hide}>
        <CardActions>
          <EditClass classCard={classCard} />
          <button className={styles.button} onClick={deleteClass}>
            Delete
          </button>
        </CardActions>
      </div>
    </div>
  );
}
