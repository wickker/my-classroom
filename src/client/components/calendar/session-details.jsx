import React from "react";
import styles from "../all_styles.scss";
var moment = require("moment");
import MarkAttendance from "./mark-attendance";
import TrashIcon from "../../svg/trash-solid.svg";
import { get, isEmpty } from "lodash";
import EditSession from "./edit-session";

export default class SessionDetails extends React.Component {
  // delete session
  deleteSession = (event) => {
    console.log(event.target.id);
    let seshId = event.target.id;
    const data = { seshId: seshId };
    let url = "/sessions/delete";
    // alert to confirm
    alert("Confirm delete?");
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
        location.reload();
      })
      .catch((error) => {
        console.error("Error:", error);
        location.reload();
      });
  };

  render() {
    // check if session object is empty and if not, define variables
    let obj = get(this.props, "obj") || {};
    // hide session details if object is empty
    let isHidden = isEmpty(obj);
    let image = get(obj, "class.image") || "";
    let title = get(obj, "class.title") || "";
    let description = get(obj, "class.description") || "";
    let startDateTime = get(obj, "session.start_datetime") || "";
    let date = moment(startDateTime, "x").format("DD MMMM YYYY");
    let startTime = moment(startDateTime, "x").format("hh:mm A");
    let endDateTime = get(obj, "session.end_datetime") || "";
    let endTime = moment(endDateTime, "x").format("hh:mm A");
    let location = get(obj, "session.location") || "";
    let sessionId = get(obj, "session.id") || "";
    let instructors = get(obj, "session.instructors") || "";

    // generate list of instructors for display
    let instructorHTML;
    if (instructors.length > 0) {
      instructorHTML = instructors.map((element, index) => {
        return <li key={index}>{element.name}</li>;
      });
    } else {
      instructorHTML = <p>No instructor assigned yet.</p>;
    }

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
              <div className="col-sm">
                <h5>{title}</h5>
              </div>
              <div className="col-sm-3" hidden={this.props.hide}>
                <MarkAttendance object={obj} />
              </div>
              <div className="col-sm-1" hidden={this.props.hide}>
                <img
                  className={styles.trash}
                  src={TrashIcon}
                  id={sessionId}
                  onClick={this.deleteSession}
                />
              </div>
              <div className="col-sm" hidden={this.props.hide}> 
                <EditSession
                  obj={this.props.obj}
                  classesArr={this.props.classesArr}
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
                <div>
                  Instructors:
                  <ul>{instructorHTML}</ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
