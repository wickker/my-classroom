import React from "react";
import styles from "./classes.scss";
var classNames = require("classnames");
const cx = classNames.bind(styles);
import ClassCard from "./card-class";
import NewClass from "./new-class";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";

export default class BodyClasses extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      classes: [],
      ogClasses: [],
      searchMsg: "",
      classCard: "",
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
            <ClassCard classCard={element} />
          </div>
        );
      });
      return HTML;
    }
  };

  // styles
  input = cx(styles.input, "form-control");

  render() {
    let cards = this.renderCards() || "";

    return (
      <div className="row">
        <div className="col-sm">
          {/* new class button */}
          <NewClass />
          {/* search component begins here */}
          Search
          <input className={this.input} onChange={this.search} />
          <div>{this.state.searchMsg}</div>
          {/* render all class cards */}
          <div className="mt-3 row">{cards}</div>
        </div>
      </div>
    );
  }
}
