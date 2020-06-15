import React from "react";
import styles from "../all_styles.scss";
var moment = require("moment");
import MarkAttendance from "../dashboard/mark-attendance-dashboard";
import TrashIcon from "../../svg/trash-alt-regular.svg";
import { get, isEmpty } from "lodash";
import EditSession from "./edit-session";
var classNames = require("classnames");
const cx = classNames.bind(styles);

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

  card = cx(styles.card, "col-sm", "mx-3", "py-3");

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
    let students = get(obj, "class.students") || [];
    let session = get(obj, "session") || {};

    // generate list of instructors for display
    let instructorHTML;
    if (instructors.length > 0) {
      instructorHTML = instructors.map((element, index) => {
        return <li key={index}>{element.name}</li>;
      });
    } else {
      instructorHTML = <p>No instructor assigned yet.</p>;
    }

    // generate obj to pass to mark attendance component
    let sessionObj = session;
    let studentsMatchSesh;
    if (students.length > 0) {
      studentsMatchSesh = students.filter(
        (element) => element.session_id === sessionId
      );
    }
    sessionObj.students = studentsMatchSesh;
    sessionObj.session_id = sessionId;
    sessionObj.title = title;
    sessionObj.description = description;
    sessionObj.image = image;
    console.log("SESION OBJ: ", sessionObj);

    return (
      <div hidden={isHidden}>
        <div className={styles.subheader}>Session</div>
        <div className="row">
          <div className={this.card}>
            <div className="row">
              <div className="col-sm">
                <img
                  className={styles.session_det_image}
                  src={image}
                  alt="class image"
                ></img>
              </div>
              <div className="col-sm">
                <table>
                  <tr>
                    <td>
                      <div className={styles.card_title}>{title}</div>
                    </td>
                    <td hidden={this.props.hide}>
                      <EditSession
                        obj={this.props.obj}
                        classesArr={this.props.classesArr}
                      />
                    </td>
                    <td hidden={this.props.hide}>
                      <img
                        className={styles.seshIcon}
                        src={TrashIcon}
                        id={sessionId}
                        onClick={this.deleteSession}
                      />
                    </td>
                  </tr>
                </table>
                <div hidden={this.props.hide}>
                  <MarkAttendance obj={sessionObj} />
                </div>
                <div className={styles.card_text}>
                  <div className="mb-2 mt-1">
                    <b>{date}</b>
                  </div>
                  <div className="mb-2">
                    <b>
                      {startTime} - {endTime}
                    </b>
                  </div>
                  <div>
                    <b>{location}</b>
                  </div>
                </div>
              </div>
              <div className="col-sm">
                <div className={styles.card_text}>
                  <div>
                    <b>Description</b>
                  </div>
                  <div>{description}</div>
                  <div>
                    <div className="mt-2">
                      <b>Instructors</b>
                    </div>
                    <ul>{instructorHTML}</ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
