import React from "react";
import styles from "./classes.scss";
var classNames = require("classnames");
const cx = classNames.bind(styles);
import SearchClasses from "./search-classes";

export default class BodyClasses extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: "",
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

  getClass = (event) => {
    console.log(event.target.id);
    let classId = parseInt(event.target.id);
    let obj = this.state.ogClasses.find((element) => {
      return element.id === classId;
    });
    this.setState({ classCard: obj, isHidden: false });
  };

  input = cx(styles.input, "form-control");

  render() {
    return (
      <div className="row">
        <div className="col-sm">
          {/* <NewClass /> */}

          <div className="row">
            <div className="col-sm-4">
              Search
              <input className={this.input} onChange={this.search} />
              <div>{this.state.searchMsg}</div>
              {this.state.loading ? null : (
                <SearchClasses
                  classes={this.state.classes}
                  getClass={this.getClass}
                />
              )}
            </div>
            <div className="col-sm">
              {/* <ShowCard
              student={this.state.studentCard}
              isHidden={this.state.isHidden}
              classesArr={this.state.classes}
            /> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
