import React from "react";

import styles from "./calendar.scss";
var moment = require("moment");
import MarkAttendance from "./mark-attendance";
import TrashIcon from "../../svg/trash-solid.svg";

export default class SessionDetails extends React.Component {
  deleteSession = (event) => {
    console.log(event.target.id);
    let seshId = event.target.id;
    const data = { seshId: seshId };
    let url = "/sessions/delete";
    alert("Confirm delete?");
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
        location.reload();
      })
      .catch((error) => {
        console.error("Error:", error);
        location.reload();
      });
  };

  render() {
    let obj = this.props.obj;

    let isHidden = true;
    let image = "";
    let title = "";
    let description = "";
    let date = "";
    let startTime = "";
    let endTime = "";
    let location = "";
    let sessionId = "";

    if (obj !== "") {
      isHidden = false;
      image = obj.class.image;
      title = obj.class.title;
      description = obj.class.description;
      date = moment(obj.session.start_datetime, "x").format("DD MMMM YYYY");
      startTime = moment(obj.session.start_datetime, "x").format("hh:mm A");
      endTime = moment(obj.session.end_datetime, "x").format("hh:mm A");
      location = obj.session.location;
      sessionId = obj.session.id;
    }

    console.log("image: ", image);

    return (
      <div hidden={isHidden}>
        <h4>Session</h4>
        <div className="row mb-3">
          <div className="col-sm-3">
            <img
              className={styles.session_det_image}
              src={image}
              alt="class image"
            ></img>
          </div>
          <div className="col-sm">
            <div className="row mb-3">
              <div className="col-sm-6">
                <h5>{title}</h5>
              </div>
              <div className="col-sm-4">
                <MarkAttendance obj={this.props.obj} />
              </div>
              <div className="col-sm">
                <img
                  className={styles.trash}
                  src={TrashIcon}
                  id={sessionId}
                  onClick={this.deleteSession}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-sm">
                <p>{date}</p>
                <p>
                  {startTime} - {endTime}
                </p>
                <p>{location}</p>
              </div>
              <div className="col-sm">
                <p>{description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
