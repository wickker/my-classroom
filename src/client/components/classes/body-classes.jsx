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
      isHidden: true,
      classCard: "",
    };
  }

  getClasses = async () => {
    let url = "/classes/get";
    let response = await fetch(url);
    let data = await response.json();
    console.log("classes: ", data);
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

  search = (event) => {
    let str = event.target.value.toUpperCase();
    let classes = this.state.classes;
    let searched = [];
    classes.forEach((element) => {
      if (element.title.toUpperCase().includes(str)) {
        searched.push(element);
      }
    });
    searched.length > 0
      ? this.setState({ classes: searched, searchMsg: "" })
      : this.setState({
          classes: this.state.ogClasses,
          searchMsg: "No search results found.",
        });
  };

  renderCards = () => {
    if (this.state.classes.length > 0) {
      let classes = this.state.classes;
      let HTML = classes.map((element, index) => {
        return (
          // <Grid item xs={3}>
            <div className="col-sm-3 mb-3">
              <ClassCard classCard={element} index={index} />
            </div>
          // </Grid>
        );
      });
      return HTML;
    }
  };

  input = cx(styles.input, "form-control");

  render() {
    let cards = this.renderCards() || "";

    return (
      <div className="row">
        <div className="col-sm">
          <NewClass />
          Search
          <input className={this.input} onChange={this.search} />
          <div>{this.state.searchMsg}</div>
          <div className="mt-3 card-group">
            <Grid container alignItems="stretch">
              {cards}
            </Grid>
          </div>

        </div>
      </div>
    );
  }
}
