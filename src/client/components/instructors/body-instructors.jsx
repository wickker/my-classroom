import React from "react";
import NewInstructor from "./new-instructor";
// import SearchStudents from "./search-students";
import InstructorCard from "./card-instructor";
import styles from "../all_styles.scss";
var classNames = require("classnames");
const cx = classNames.bind(styles);

export default class BodyInstructors extends React.Component {
  constructor() {
    super();
    this.state = {
      classes: [],
      sessions: [],
      ogInstructors: [],
      instructors: [],
      searchMsg: "",
      hide: false,
      loggedId: "",
    };
  }

  getClasses = async () => {
    let url = "/classes/get";
    let response = await fetch(url);
    let data = await response.json();
    console.log("classes: ", data.classes);
    return data.classes;
  };

  getSessions = async () => {
    let url = "/sessions/get";
    let response = await fetch(url);
    let data = await response.json();
    console.log("sessions: ", data);
    return data;
  };

  getInstructors = async () => {
    let url = "/instructors/get";
    let response = await fetch(url);
    let data = await response.json();
  
    return data;
  };

  componentWillMount = async () => {
    // check for login
    let banana = localStorage.getItem("banana");
    if (!banana) {
      this.setState({ hide: true });
    } else {
      banana = JSON.parse(banana);
      this.setState({ loggedId: parseInt(banana.id) });
    }
    this.state.loading = true;
    let classes = await this.getClasses();
    let sessions = await this.getSessions();
    let instructors = await this.getInstructors();
    this.setState({
      loading: false,
      classes,
      sessions,
      ogInstructors: instructors,
      instructors,
    });
  };

  renderCards = () => {
    if (this.state.instructors.length > 0) {
      let instructors = this.state.instructors;
      let HTML = instructors.map((element, index) => {
        let loggedId = this.state.loggedId;
        let hide = false;
        if (loggedId === "") {
          hide = this.state.hide;
        } else if (loggedId !== element.id) {
          hide = true;
        }
        return (
          <div className="col-sm-3 mb-3" key={index}>
            <InstructorCard
              instructor={element}
              classesArr={this.state.classes}
              sessions={this.state.sessions}
              hide={hide}
              instructors={this.state.ogInstructors}
            />
          </div>
        );
      });
      return HTML;
    }
  };

  search = (event) => {
    
    let str = event.target.value.toUpperCase();
    let ogInstructors = this.state.ogInstructors;
    let searched = [];
    ogInstructors.forEach((element) => {
      if (element.name.toUpperCase().includes(str)) {
        searched.push(element);
      }
    });
    searched.length > 0
      ? this.setState({ instructors: searched, searchMsg: "" })
      : this.setState({
          instructors: this.state.ogInstructors,
          searchMsg: "No search results found.",
        });
  };

  input = cx(styles.input_field, "form-control");

  render() {
    let cards = this.renderCards() || "";

    return (
      <div className="row">
        <div className="col-sm">
          <div hidden={this.state.hide}>
            <NewInstructor
              classes={this.state.classes}
              sessions={this.state.sessions}
              instructors={this.state.ogInstructors}
            />
          </div>
          <span className={styles.input_field}>Search</span>
          <div className="mt-1 mb-2">
            <input
              className={this.input}
              style={{ width: "40%" }}
              onChange={this.search}
            />
          </div>
          <div className={styles.input_field}>{this.state.searchMsg}</div>
          <div className="mt-3 row">{cards}</div>
        </div>
      </div>
    );
  }
}
