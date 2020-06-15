import React from "react";
import styles from "../all_styles.scss";
var classNames = require("classnames");
const cx = classNames.bind(styles);
import ClassCard from "./card-class";
import NewClass from "./new-class";
// import Grid from "@material-ui/core/Grid";
// import Card from "@material-ui/core/Card";

export default class BodyClasses extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      classes: [],
      ogClasses: [],
      searchMsg: "",
      classCard: "",
      hide: false,
    };
  }

  // get all classes data
  getClasses = async () => {
    let url = "/classes/get";
    let response = await fetch(url);
    let data = await response.json();
    return data.classes;
  };

  componentWillMount = async () => {
    // check for login
    let banana = localStorage.getItem("banana");
    if (!banana) {
      this.setState({ hide: true });
    }
    this.state.loading = true;
    let classes = await this.getClasses();
    console.log("classes: ", classes);
    this.setState({
      loading: false,
      classes,
      ogClasses: classes,
    });
  };

  // search function
  search = (event) => {
    let str = event.target.value.toUpperCase();
    let classes = this.state.classes;
    let searched = [];
    classes.forEach((element) => {
      if (element.title.toUpperCase().includes(str)) {
        searched.push(element);
      }
    });
    // if there are search results, or not
    searched.length > 0
      ? this.setState({ classes: searched, searchMsg: "" })
      : this.setState({
          classes: this.state.ogClasses,
          searchMsg: "No search results found.",
        });
  };

  // render class cards depending on search results
  renderCards = () => {
    if (this.state.classes.length > 0) {
      let classes = this.state.classes;
      let HTML = classes.map((element, index) => {
        return (
          <div className="col-sm-3 mb-3" key={index}>
            <ClassCard classCard={element} hide={this.state.hide} />
          </div>
        );
      });
      return HTML;
    }
  };

  // styles
  input = cx(styles.input_field, "form-control");

  render() {
    let cards = this.renderCards() || "";

    return (
      <div className="row">
        <div className="col-sm">
          {/* new class button */}
          <div hidden={this.state.hide}>
            <NewClass />
          </div>
          {/* search component begins here */}
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
