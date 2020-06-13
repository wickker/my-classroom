import React from "react";
import { isEmpty } from "lodash";
var moment = require("moment");
import MarkAttendance from "./mark-attendance-dashboard";

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
    let url = new URL("http://localhost:3000/dashboard/get");
    url.search = new URLSearchParams(params).toString();
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
    console.log("sessions today filtered: ", sessionsFiltered);
    // if there are sessions commencing today
    if (sessionsFiltered.length > 0) {
      let sessionsTodayHTML = sessionsFiltered.map((element, index) => {
        let date = moment(element.start_datetime, "x").format("DD MMMM YYYY");
        let startTime = moment(element.start_datetime, "x").format("hh:mm A");
        let endTime = moment(element.end_datetime, "x").format("hh:mm A");
        return (
          <div key={index}>
            <div>{element.title}</div>
            <div>{date}</div>
            <div>
              {startTime} - {endTime}
            </div>
            <div>
              <MarkAttendance obj={element} />
            </div>
          </div>
        );
      });
      return sessionsTodayHTML;
      // if there are no sessions commencing today
    } else {
      return "You have no classes scheduled for today.";
    }
  };

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
    console.log("sessions week filtered: ", sessionsFiltered);
    // if there are sessions commencing tomorrow for a week
    if (sessionsFiltered.length > 0) {
      let sessionsWeekHTML = sessionsFiltered.map((element, index) => {
        let date = moment(element.start_datetime, "x").format("DD MMMM YYYY");
        let startTime = moment(element.start_datetime, "x").format("hh:mm A");
        let endTime = moment(element.end_datetime, "x").format("hh:mm A");
        return (
          <div key={index} className="col-sm-3 h-100">
            <div className="card">
              <img className="card-img-top" src={element.image} alt="class image" />
              <div className="card-body">
                <h5 className="card-title">{element.title}</h5>
                <div className="card-text">
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
      return (<div className="col-sm">You have no upcoming classes for the week.</div>);
    }
  };

  render() {
    let sessionsTodayHTML = this.renderClassesToday() || "";
    let sessionsWeekHTML = this.renderClassesWeek() || "";

    return (
      <div className="row">
        <div className="col-sm">
          <h4>Hello {this.state.user.name}!</h4>
          <h3>Today's Classes</h3>
          <div>{sessionsTodayHTML}</div>
          <h3>Upcoming Classes</h3>
          <div className="row">
            {sessionsWeekHTML}
          </div>
        </div>
      </div>
    );
  }
}
