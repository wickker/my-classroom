import React from "react";
import styles from "./calendar.scss";
import MonthSelector from "./month-selector";
import YearSelector from "./year-selector";
import NewSessionDialog from "./new-session-dialog";
import SessionDetails from "./session-details";
var classNames = require("classnames");
const cx = classNames.bind(styles);
var moment = require("moment");
export default class CalendarGrid extends React.Component {
  constructor() {
    super();
    // get date and year today to render default calendar
    let today = new Date();
    let m = today.getMonth();
    m = m + 1;
    let y = today.getFullYear();

    this.state = {
      datesInMonth: [],
      selectedMonth: m,
      selectedYear: y,
      sessions: [],
      classes: [],
      isSessionHidden: true,
      sessionObj: {},
      hide: false,
    };
  }

  parseNumToMonth = (number) => {
    switch (number) {
      case 1:
        return "January";
      case 2:
        return "February";
      case 3:
        return "March";
      case 4:
        return "April";
      case 5:
        return "May";
      case 6:
        return "June";
      case 7:
        return "July";
      case 8:
        return "August";
      case 9:
        return "September";
      case 10:
        return "October";
      case 11:
        return "November";
      case 12:
        return "December";
    }
  };

  // get number of days in a month-year
  getDaysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate();
  };

  // get the first day of a month-year
  getFirstDayOfMonth = (month, year) => {
    let monthParse = month - 1;
    let dateObj = new Date(year, monthParse, 1);
    let dayNum = dateObj.getDay();
    return dayNum;
  };

  // initialize raw calendar array
  initCalendarArray = (month, year) => {
    let dayNum = this.getFirstDayOfMonth(month, year);
    console.log("day: ", dayNum);
    let daysInMonth = this.getDaysInMonth(month, year);
    let prevMonth;
    month === 1 ? (prevMonth = 12) : (prevMonth = month - 1);
    let nextMonth;
    month === 12 ? (nextMonth = 1) : (nextMonth = month + 1);
    let daysInPrevMonth = this.getDaysInMonth(prevMonth, year);
    let count = 1;
    let nextCount = 1;
    let array = [];
    for (let x = 0; x < 6; x++) {
      array.push([]);
      for (let y = 0; y < 7; y++) {
        if (dayNum > 0) {
          let value = daysInPrevMonth - dayNum + 1;
          let str = value + "-" + prevMonth + "-" + year;
          array[x].push(str);
          dayNum--;
        } else if (count <= daysInMonth) {
          let str = count + "-" + month + "-" + year;
          array[x].push(str);
          count++;
        } else {
          let str = nextCount + "-" + nextMonth + "-" + year;
          array[x].push(str);
          nextCount++;
        }
      }
    }
    // get classes
    this.getClasses();
    // get sessions that fall between selected date range
    let startDate = moment(array[0][0], "D-M-YYYY").valueOf();
    let endDate = moment(array[5][6], "D-M-YYYY").valueOf();
    this.getSessions(startDate, endDate);
    // set states
    this.setState({
      datesInMonth: array,
      selectedMonth: month,
      selectedYear: year,
    });
  };

  // query sessions that fall between selected date range
  getSessions = (startDate, endDate) => {
    const params = { startDate: startDate, endDate: endDate };
    let url = new URL("http://localhost:3000/sessions");
    url.search = new URLSearchParams(params).toString();
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log("sessions: ", data.sessions);
        this.setState({ sessions: data.sessions });
      });
  };

  // query classes
  getClasses = () => {
    let url = "/classes/get";
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log("classes: ", data.classes);
        this.setState({ classes: data.classes });
      });
  };

  componentDidMount = () => {
    // check login
    let banana = localStorage.getItem("banana");
    console.log("BANANA: ", banana);
    if (!banana) {
      this.setState({ hide: true });
    }
    this.initCalendarArray(this.state.selectedMonth, this.state.selectedYear);
  };

  // select month from dropdown
  selectMonth = (event) => {
    this.setState({ sessionObj: {} });
    this.initCalendarArray(event.target.value, this.state.selectedYear);
  };

  // select year from dropdown
  selectYear = (event) => {
    this.setState({ sessionObj: {} });
    this.initCalendarArray(this.state.selectedMonth, event.target.value);
  };

  // show session details on click
  showSessionDetails = (event) => {
    console.log("SESSION ID: ", event.target.id);
    let sessionId = parseInt(event.target.id);
    let sessionDetails = this.state.sessions.find(
      (element) => element.id === sessionId
    );
    let classDetails = this.state.classes.find(
      (element) => element.id === sessionDetails.class_id
    );
    let obj = {
      session: sessionDetails,
      class: classDetails,
    };
    this.setState({ sessionObj: obj });
  };

  render() {
    // styles
    const box = cx(styles.calendar_box, "col-sm");

    const boxHead = cx(styles.calendar_box_head, "col-sm");

    const boxAround = cx(styles.calendar_box_around, "col-sm");

    const sessionBox = cx(styles.session_box, "col-sm");

    // render calendar grid
    let calendar = this.state.datesInMonth.map((row, rowIndex) => {
      const rows = row.map((col, colIndex) => {
        let sessions = this.state.sessions;
        let sessionsHTML = "";
        // render sessions within selected date range
        if (sessions.length > 0) {
          let matchingSessions = sessions.filter((element) => {
            let sessionDate = moment(element.start_datetime, "x").format(
              "D-M-YYYY"
            );
            return sessionDate === col && !element.is_delete;
          });
          if (matchingSessions.length > 0) {
            sessionsHTML = matchingSessions.map((element, index) => {
              let startTime = moment(element.start_datetime, "x").format(
                "hh:mm A"
              );
              let classObj = this.state.classes.find((classEle) => {
                return classEle.id == element.class_id;
              });
              return (
                <div className="row" key={index}>
                  <div className={sessionBox}>
                    <div
                      className={styles.session}
                      id={element.id}
                      onClick={this.showSessionDetails}
                    >
                      {classObj.title} | {startTime}
                    </div>
                  </div>
                </div>
              );
            });
          }
        }
        return (
          <div key={colIndex} className={box}>
            <div>
              <span>{col} </span>
              <span hidden={this.state.hide}>
                <NewSessionDialog classes={this.state.classes} dateStr={col} />
              </span>
            </div>
            {sessionsHTML}
          </div>
        );
      });
      return (
        <div key={rowIndex} className="row">
          {rows}
        </div>
      );
    });

    return (
      <div>
        <div className="row mb-3">
          <div className="col-sm">
            <MonthSelector
              selectedMonth={this.state.selectedMonth}
              selectMonth={this.selectMonth}
            />
          </div>
          <div className="col-sm">
            <YearSelector
              selectedYear={this.state.selectedYear}
              selectYear={this.selectYear}
            />
          </div>
        </div>
        <SessionDetails
          obj={this.state.sessionObj}
          classesArr={this.state.classes}
          hide={this.state.hide}
        />
        <div className="row">
          <div className={boxAround}>
            <div className="row">
              <div className={boxHead}>Sunday</div>
              <div className={boxHead}>Monday</div>
              <div className={boxHead}>Tuesday</div>
              <div className={boxHead}>Wednesday</div>
              <div className={boxHead}>Thursday</div>
              <div className={boxHead}>Friday</div>
              <div className={boxHead}>Saturday</div>
            </div>
            {calendar}
          </div>
        </div>
      </div>
    );
  }
}
