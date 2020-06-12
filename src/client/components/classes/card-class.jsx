import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
var moment = require("moment");
import styles from "./classes.scss";
import EditClass from "./edit-class";
import { get } from "lodash";

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
export default function MediaCard({ classCard }) {
  const classes = useStyles();

  // declare variables
  let title = get(classCard, "title") || "";
  let description = get(classCard, "title") || "";
  let frequency = get(classCard, "frequency") || "";
  let image = get(classCard, "image") || "";
  let id = get(classCard, "id") || "";
  let instructors = get(classCard, "instructors") || [];

  // delete class function
  const deleteClass = () => {
    console.log(id);
    alert("Confirm delete?");
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

  return (
    <div className={styles.card}>
      <Card className={classes.root}>
        {/* card image goes here */}
        <CardMedia
          className={classes.media}
          image={image}
          alt="class picture"
        />
        {/* main card content goes here */}
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <div>Description: {description}</div>
          <div>Frequency: {frequency}</div>
          <div>
            Instructors:
            <ul>{instructorsHTML}</ul>
          </div>
        </CardContent>
        {/* edit and delete buttons */}
        <CardActions>
          <EditClass classCard={classCard} />
          <Button variant="contained" color="primary" onClick={deleteClass}>
            Delete
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}
