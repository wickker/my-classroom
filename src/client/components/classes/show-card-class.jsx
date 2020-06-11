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

const useStyles = makeStyles({
  root: {
    maxWidth: 350,
  },
  media: {
    height: 350,
  },
});

export default function MediaCard({ classCard, isHidden }) {
  const classes = useStyles();

  let title = "";
  let description = "";
  let frequency = "";
  let image = "";
  let id = "";

  if (classCard !== "") {
    
    title = classCard.title;
    description = classCard.description;
    frequency = classCard.frequency;
    image = classCard.image;
    id = classCard.id;

  }

  const deleteClass = () => {
    // console.log(id);
    // let data = {
    //   id: id,
    // }
    // let url = '/students/delete';
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
  }

  return (
    <div className={styles.card} hidden={isHidden}>
      <Card className={classes.root}>
        <CardMedia
          className={classes.media}
          image={image}
          alt="class picture"
        />
        <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <div>
            Description: {description}
          </div>
          <div>
            Frequency: {frequency}
          </div>
        </CardContent>
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