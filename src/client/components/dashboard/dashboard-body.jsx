import React from "react";
import { isEmpty } from "lodash";
var moment = require("moment");
import MarkAttendance from "./mark-attendance";
import styles from "../all_styles.scss";
var classNames = require("classnames");
const cx = classNames.bind(styles);

export default class DashboardBody extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {},
      sessions: [],
    };
  }

  componentDidMount = () => {
    let user = JSON.parse(localStorage.getItem("banana"));
    if (!!user && !isEmpty(user)) {
      this.setState({ user });
      this.getSessionsAndAttendance(user);
    }
  };

  compareTime = (a, b) => {
    return a.start_datetime - b.start_datetime;
  };

  getSessionsAndAttendance = async (user) => {
    const params = { instructorId: user.id };
    let url = `/dashboard/get?instructorId=${user.id}`;
    let response = await fetch(url);
    let data = await response.json();
    console.log("sessions: ", data);
    let sorted = data.sort(this.compareTime);
    this.setState({ sessions: sorted });
  };

  renderClassesToday = () => {
    let sessions = this.state.sessions;
    // filter sessions that commence today
    let today = new Date();
    today.setHours(0, 0, 0);
    let todayStart = moment(today).valueOf();
    // mS in 23 hours 59 minutes
    let todayEnd = todayStart + 86340000;
    let sessionsFiltered = sessions.filter((element) => {
      let startDateTimeInt = parseInt(element.start_datetime);
      return startDateTimeInt >= todayStart && startDateTimeInt <= todayEnd;
    });
    
    // if there are sessions commencing today
    if (sessionsFiltered.length > 0) {
      let sessionsTodayHTML = sessionsFiltered.map((element, index) => {
        let date = moment(element.start_datetime, "x").format("DD MMMM YYYY");
        let startTime = moment(element.start_datetime, "x").format("hh:mm A");
        let endTime = moment(element.end_datetime, "x").format("hh:mm A");
        return (
          <div className="row" key={index}>
            <div className="col-sm-6">
              <div className={styles.today_class}>
                <div className={styles.card_title}>{element.title}</div>
                <div className={styles.card_text}>
                  <div>{date}</div>
                  <div>
                    {startTime} - {endTime}
                  </div>
                </div>
                <div>
                  <MarkAttendance obj={element} attendanceIcon={false} />
                </div>
              </div>
            </div>
          </div>
        );
      });
      return sessionsTodayHTML;
      // if there are no sessions commencing today
    } else {
      return (
        <div className={styles.no_class_msg}>
          You have no classes scheduled for today.
        </div>
      );
    }
  };

  card = cx(styles.card2, "h-100");

  renderClassesWeek = () => {
    let sessions = this.state.sessions;
    // filter sessions that commence tomorrow for a week
    let today = new Date();
    today.setHours(0, 0, 0);
    let todayStart = moment(today).valueOf();
    // mS in one day
    let tmrStart = todayStart + 86400000;
    // mS in 7 days
    let weekEnd = todayStart + 604800000;
    let sessionsFiltered = sessions.filter((element) => {
      let startDateTimeInt = parseInt(element.start_datetime);
      return startDateTimeInt >= tmrStart && startDateTimeInt <= weekEnd;
    });
    // if there are sessions commencing tomorrow for a week
    if (sessionsFiltered.length > 0) {
      let sessionsWeekHTML = sessionsFiltered.map((element, index) => {
        let date = moment(element.start_datetime, "x").format("DD MMMM YYYY");
        let startTime = moment(element.start_datetime, "x").format("hh:mm A");
        let endTime = moment(element.end_datetime, "x").format("hh:mm A");
        return (
          <div key={index} className="col-sm-3">
            <div className={this.card}>
              <img
                className="card-img-top"
                src={element.image}
                alt="class image"
              />
              <div className="card-body">
                <div className={styles.card_title}>{element.title}</div>
                <div className={styles.card_text}>
                  <div>{date}</div>
                  <div>
                    {startTime} - {endTime}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      });
      return sessionsWeekHTML;
      // if there are no sessions commencing tomorrow for a week
    } else {
      return (
        <div className="col-sm">
          <div className={styles.no_class_msg}>
            You have no upcoming classes for the week.
          </div>
        </div>
      );
    }
  };

  render() {
    let sessionsTodayHTML = this.renderClassesToday() || "";
    let sessionsWeekHTML = this.renderClassesWeek() || "";

    return (
      <div className="row">
        <div className="col-sm">
          <div className={styles.greeting}>Hello {this.state.user.name}!</div>
          <div className={styles.subheader}>Today's Classes</div>
          {sessionsTodayHTML}
          <div className={styles.subheader}>Upcoming Classes</div>
          <div className="row">{sessionsWeekHTML}</div>
        </div>
      </div>
    );
  }
}
